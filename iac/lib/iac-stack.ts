import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
// import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'

import { Construct } from 'constructs'

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const stage = process.env.STAGE || 'dev'
    const acmCertificateArn = process.env.ACM_CERTIFICATE_ARN || ''
    const alternativeDomainName = process.env.ALTERNATIVE_DOMAIN_NAME || ''

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

    if (
      (stage === 'dev' || stage === 'homolog' || stage === 'prod') &&
      !acmCertificateArn
    ) {
      throw new Error(
        `ACM_CERTIFICATE_ARN é obrigatório para o stage: ${stage}`
      )
    }

    // Permite múltiplos domínios alternativos separados por vírgula
    let domainNames: string[] = []
    if (alternativeDomainName) {
      domainNames = alternativeDomainName
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean)
    }

    const hostedZoneId = process.env.HOSTED_ZONE_ID || ''
    const hostedZoneName = process.env.HOSTED_ZONE_NAME || ''

    let viewerCertificate =
      cloudfront.ViewerCertificate.fromCloudFrontDefaultCertificate()

    if (stage === 'dev' || stage === 'homolog' || stage === 'prod') {
      viewerCertificate = cloudfront.ViewerCertificate.fromAcmCertificate(
        Certificate.fromCertificateArn(
          this,
          'ReservationFrontCertificate-' + stage,
          acmCertificateArn
        ),
        {
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
          aliases: domainNames.length > 0 ? domainNames : undefined
        }
      )
    }

    const cloudFrontWebDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'CDN',
      {
        comment: 'Reservation Front Distribution ' + stage,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: s3Bucket
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD,
                compress: true,
                cachedMethods:
                  cloudfront.CloudFrontAllowedCachedMethods.GET_HEAD,
                viewerProtocolPolicy:
                  cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                minTtl: cdk.Duration.seconds(0),
                maxTtl: cdk.Duration.seconds(86400),
                defaultTtl: cdk.Duration.seconds(3600)
              }
            ]
          }
        ],
        viewerCertificate: viewerCertificate,
        errorConfigurations: [
          {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: '/index.html',
            errorCachingMinTtl: 0
          }
        ]
      }
    )

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

    if (domainNames.length > 0 && hostedZoneId && hostedZoneName) {
      const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
        this,
        'HostedZone',
        {
          hostedZoneId: hostedZoneId,
          zoneName: hostedZoneName
        }
      )

      // Criar um registro para cada domain name alternativo
      domainNames.forEach((domain, index) => {
        new route53.ARecord(this, `CloudFrontARecord-${stage}-${index}`, {
          zone: hostedZone,
          recordName: domain,
          target: route53.RecordTarget.fromAlias(
            new route53Targets.CloudFrontTarget(cloudFrontWebDistribution)
          )
        })

        // Criar também registro AAAA para IPv6
        new route53.AaaaRecord(this, `CloudFrontAAAARecord-${stage}-${index}`, {
          zone: hostedZone,
          recordName: domain,
          target: route53.RecordTarget.fromAlias(
            new route53Targets.CloudFrontTarget(cloudFrontWebDistribution)
          )
        })
      })
    } else if (domainNames.length > 0) {
      console.warn(
        'Domain names alternativos fornecidos, mas HOSTED_ZONE_ID ou HOSTED_ZONE_NAME não configurados. Registros DNS não serão criados.'
      )
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
