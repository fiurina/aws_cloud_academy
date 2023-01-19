const AWS = require('aws-sdk');

var awsRegion = "eu-west-1";
//TODO:Add identity pool
var identityPoolId = "";
const AWSService = AWS;  
authenticate();

function authenticate() {
    AWSService.config.update({
      region: awsRegion,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId
      }),
    });
    module.exports = { AWSService }
}

