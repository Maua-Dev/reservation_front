import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { Certificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'
import * as iam from 'aws-cdk-lib/aws-iam'

import { Construct } from 'constructs'

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // dev: sa-east-1
    // homolog: us-west-2
    // prod: us-east-1
    const stage = process.env.GITHUB_REF_NAME || 'dev'
    const acmCertificateArn =
      process.env.ACM_CERTIFICATE_ARN ||
      'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012'
    const alternativeDomain =
      process.env.ALTERNATIVE_DOMAIN_NAME || 'reservation-dev.devmaua.com'
    const hostedZoneIdValue = process.env.HOSTED_ZONE_ID || 'Z1UJRXOUMOOFQ8'

    const s3Bucket = new s3.Bucket(this, 'ReservationFrontBucket' + stage, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
      autoDeleteObjects: true
    })

    const oac = new cloudfront.CfnOriginAccessControl(this, 'AOC', {
      originAccessControlConfig: {
        name: 'Reservation Front Bucket OAC ' + stage,
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4'
      }
    })

    const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(s3Bucket, {
      originAccessControlId: oac.attrId
    })

    let certificate: ICertificate | undefined = undefined
    if (stage === 'dev' || stage === 'homolog') {
      certificate = Certificate.fromCertificateArn(
        this,
        'ReservationFrontCertificate-' + stage,
        acmCertificateArn
      )
    }

    if (stage === 'prod') {
      certificate = Certificate.fromCertificateArn(
        this,
        'ReservationFrontCertificate-' + stage,
        acmCertificateArn
      )
    }

    const cloudFrontWebDistribution = new cloudfront.Distribution(this, 'CDN', {
      comment: 'Reservation Front Distribution ' + stage,
      defaultBehavior: {
        origin: s3Origin,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        compress: true,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: new cloudfront.CachePolicy(this, 'CachePolicy', {
          minTtl: cdk.Duration.seconds(0),
          maxTtl: cdk.Duration.seconds(86400),
          defaultTtl: cdk.Duration.seconds(3600)
        })
      },
      certificate,
      domainNames: [alternativeDomain],
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0)
        }
      ],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021
    })

    const cfnDistribution = cloudFrontWebDistribution.node
      .defaultChild as cloudfront.CfnDistribution

    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.OriginAccessControlId',
      oac.getAtt('Id')
    )

    s3Bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        resources: [s3Bucket.arnForObjects('*')]
      })
    )

    if (stage === 'prod' || stage === 'homolog' || stage === 'dev') {
      const zone = route53.HostedZone.fromHostedZoneAttributes(
        this,
        'ReservationFrontHostedZone-' + stage,
        {
          hostedZoneId: hostedZoneIdValue,
          zoneName: alternativeDomain
        }
      )

      new route53.ARecord(this, 'ReservationFrontAliasRecord-' + stage, {
        zone: zone,
        recordName: alternativeDomain,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(cloudFrontWebDistribution)
        )
      })
    }

    new cdk.CfnOutput(this, 'ReservationFrontBucketName-' + stage, {
      value: s3Bucket.bucketName
    })

    new cdk.CfnOutput(this, 'ReservationFrontDistributionId-' + stage, {
      value: cloudFrontWebDistribution.distributionId
    })

    new cdk.CfnOutput(this, 'ReservationFrontDistributionDomainName-' + stage, {
      value: cloudFrontWebDistribution.distributionDomainName
    })
  }
}
