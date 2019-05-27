export const environment = {
  production: true,
  apiEndpoint: 'http://pet-store-ace.us-west-2.elasticbeanstalk.com',
  auth: {
    clientID: 'v4KfUDCcBE76HBgzEqIHIBfydju33XxD',
    domain: 'chadi-pet-store.auth0.com',
    audience: 'http://pet-store-ace.us-west-2.elasticbeanstalk.com', // e.g., http://localhost:3001
    redirect: 'http://ng-pet-store-ace-deployment.s3-website-us-west-2.amazonaws.com/callback',
    scope: 'openid profile',
    logoutReturnTo: 'http://ng-pet-store-ace-deployment.s3-website-us-west-2.amazonaws.com'
  }
};

