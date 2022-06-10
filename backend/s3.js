const AWS = require("aws-sdk");
const fs = require("fs");
const {
  AWS_ACCESS_KEY,
  AWS_BUCKET,
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

/* 

* Note:- For better way we can add more folder in any specific user Account. Just support we have a record and we are creating Blog Project then we can create flow like that


const userData = {
  _id:"3144dd484d6a5d789d4as5d",
  name:"Test User",
  profileImage:"profileImage/filekey",
  BlogImage:"blogimage/filekey",
  FeaturedImages:"featuresimg/filekey",
  Document:"Doc/filekey"
}

So our data after insertion looklike this and we have to find all in specific user folder and we have create 


user_id/profileImage/key
user_id/BlogImage/key
user_id/FeaturedImages/key
user_id/Document/key

so its better to find user record and better to remove if any record need to remove.


and when we are removing any user we have to remove whole folder of the user 
 */
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

const getFile = async (bucketName, fileKey) => {
  const downloadParmas = {
    Key: `images/${fileKey}`,
    Bucket: bucketName,
  };
  // await s3.headObject(downloadParmas).promise();
  return s3.getObject(downloadParmas).createReadStream();
};
exports.getFile = getFile;

// @Service: GetSignedURL
const getSignedUrl = async (fileKey) => {
  const signedUrlExpireSeconds = 18000;
  try {
    const url = s3.getSignedUrl("getObject", {
      Bucket: AWS_BUCKET,
      Key: `images/${fileKey}`,
      Expires: signedUrlExpireSeconds,
    });
    return url;
  } catch (headErr) {
    console.log(headErr);
    if (headErr.code === "NotFound") {
      return false;
    }
  }
};

exports.getSignedUrl = getSignedUrl;

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

// @Service: Remove Object/Folder Inside Bucket

const removeFolder = async (bucketName, folderName) => {
  const listParams = {
    Bucket: bucketName,
    Prefix: `${folderName}/`,
  };
  console.log(bucketName, `${folderName}/`);
  const listedObjects = await s3.listObjectsV2(listParams).promise();

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: bucketName,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await removeObj(bucketName, folderName);
};
exports.removeFolder = removeFolder;

const removeObj = async (bucketName, fileKey) => {
  var params = { Bucket: AWS_BUCKET, Key: `images/${fileKey}` };
  console.log(params);
  return await s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log("success");
  });
};
exports.removeObj = removeObj;
