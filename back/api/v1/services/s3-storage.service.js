const AWS = require('aws-sdk');
const { AWSService } = require('./cognito-auth.service');

//TODO: Update bucketName
var bucketName="";
var s3;

function initS3() {
    s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: bucketName}
    });
}

function uploadFileS3(file, folder) {
    return new Promise((resolve, reject) => {
      console.log('File upload to S3', file.name)
      initS3();
      const upload = {
        Key: file.name, Bucket: bucketName + '/' + folder,
        Body: file.buffer, ACL: 'private',
        ContentEncoding: 'base64',
        ContentType: file.contentType
      };
      // console.log('S3 upload', upload)
      s3.upload(upload,function (err, data) {
        if (err) { reject(err); }
        else { resolve(data); }
      });
    });
}

function listAllFilesS3(folder) {
    initS3();
    let search;
    if (folder) {search = { Bucket: bucketName, Delimiter: '/', Prefix: folder + '/' };
    }else search = {Bucket: bucketName}
    s3.listObjects(search,(err,data)=>{
      if (err) { console.log(err); }
      else { console.log('S3 list ', data); }
    });
}


module.exports = {
    uploadFileS3,
    listAllFilesS3,
}
