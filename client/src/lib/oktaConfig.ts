export const oktaConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  issuer: process.env.REACT_APP_ISSUER,
  redirectUri: process.env.REACT_APP_REDIRECTURI,
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
