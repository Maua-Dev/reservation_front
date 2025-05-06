import { PublicClientApplication } from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID || 'default-client-id',
    authority:
      'https://login.microsoftonline.com/' +
      import.meta.env.VITE_AUTH_TENANT_ID,
    redirectUri: '/'
  },
  cache: {
    cacheLocation: 'sessionStorage', // Armazena o token na sessionStorage
    storeAuthStateInCookie: false
  }
}

export const loginRequest = {
  scopes: ['User.Read']
}

export const msalInstance = new PublicClientApplication(msalConfig)
