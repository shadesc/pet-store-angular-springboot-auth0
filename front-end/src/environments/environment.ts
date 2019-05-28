/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:8080',
  auth: {
    clientID: 'v4KfUDCcBE76HBgzEqIHIBfydju33XxD',
    domain: 'chadi-pet-store.auth0.com',
    audience: 'http://localhost:8080', // e.g., http://localhost:3001
    redirect: 'http://localhost:4200/callback',
    scope: 'openid profile',
    logoutReturnTo: 'http://localhost:4200'
  }
};
