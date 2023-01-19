const AWS = require('aws-sdk');

var awsRegion = "eu-west-1";
//TODO:Replace this identity with a correct one
var identityPoolId = "eu-west-1:2963b769-4184-47je-b57e-57f7397cdd26";
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

