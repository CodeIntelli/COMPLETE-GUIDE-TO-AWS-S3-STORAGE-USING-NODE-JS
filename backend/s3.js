const AWS = require("aws-sdk");
const fs = require("fs");
const {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} = require("./Config");

// @AWS-CONFIG
var credentials = {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};
AWS.config.update({ credentials: credentials, region: AWS_REGION });
const s3 = new AWS.S3();

// @Service: Create Bucket

const createBucket = (bucketName) => {
  var bucketParams = {
    Bucket: bucketName,
  };

  return s3.createBucket(bucketParams).promise();
};
exports.createBucket = createBucket;

// @Service: List Bucket

const listBuckets = () => {
  return s3.listBuckets().promise();
};
exports.listBuckets = listBuckets;

// @Service: Upload File In Bucket

const uploadFile = (bucketName, file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName + `/images`,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;

// @Service: Read File In Bucket

const getFile = (bucketName, fileKey) => {
  const downloadParmas = {
    Key: fileKey,
    Bucket: bucketName + `/images`,
  };

  return s3.getObject(downloadParmas).createReadStream();
};
exports.getFile = getFile;

// @Service: List Object In Bucket

const listObjectsInBucket = (bucketName) => {
  // Create the parameters for calling listObjects
  var bucketParams = {
    Bucket: bucketName,
  };

  // Call S3 to obtain a list of the objects in the bucket
  return s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      return err;
    } else {
      return data.Contents;
    }
  });
};
exports.listObjectsInBucket = listObjectsInBucket;

// @Service: Remove Bucket

const deleteBucket = async (bucketName) => {
  // Create params for S3.deleteBucket
  var bucketParams = {
    Bucket: bucketName,
  };
  let data = await s3.deleteBucket(bucketParams);
  console.log(data);

  // Call S3 to delete the bucket
  return s3.deleteBucket(bucketParams, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};
exports.deleteBucket = deleteBucket;
