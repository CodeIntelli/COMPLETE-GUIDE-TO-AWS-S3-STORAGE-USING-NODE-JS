const express = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const { PORT } = require("./Config");
const {
  uploadFile,
  getFile,
  createBucket,
  listBuckets,
  listObjectsInBucket,
  deleteBucket,
  getSignedUrl,
  removeObj,
  removeFolder,
} = require("./s3");
const upload = multer({ dest: "uploads/" });
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(express.json());

// [ + ] Create Bucket
// @Params: /create/:bucketName

app.post("/create/:bucketName", async (req, res) => {
  try {
    // * Note:- for testing Purpose i have used params but when we work on project then we must use req.body
    let Bucketrecord = await listBuckets();
    let message;
    Bucketrecord.Buckets.filter(async function (el) {
      if (el.Name === req.params.bucketName) {
        return (message = "Bucket Already Exist");
      }
    });
    if (message === "Bucket Already Exist") {
      return res.status(404).json({ message });
    } else {
      await createBucket(req.params.bucketName);
      return res.status(200).json({ message: "Bucket Created Successfully" });
    }
  } catch (err) {
    res.send(err);
  }
});

// [ + ] List Bucket
// @Params: /listBucket

app.get("/listBucket", async (req, res) => {
  try {
    const result = await listBuckets();
    res.send(result);
  } catch (Err) {
    res.send(Err);
  }
});

// [ + ] Upload File In Bucket
// @Params: /images/:bucketName
app.post("/images/:bucketName", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    const description = req.body.description;
    const bucketName = req.params.bucketName;
    const result = await uploadFile(bucketName, file);
    res.json({ filePath: `${result.Key}` });
  } catch (err) {
    console.log(err);
  }
});

// [ + ] Read File In Bucket
// @Params: /images/:key/:bucketName
app.get("/images/:key/:bucketName", async (req, res) => {
  const key = req.params.key;
  const bucketName = req.params.bucketName;
  // console.log(bucketName, "bucketName", key);
  const readStream = await getFile(bucketName, key);
  console.log(readStream);
  readStream.pipe(res);
});

// [ + ] List Object In Bucket
// @Params: /listObj/:bucketName
app.get("/listObj/:bucketName", async (req, res) => {
  try {
    const result = await listObjectsInBucket(req.params.bucketName);
    console.log("result", result);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// [ + ] Remove Bucket
// @Params: /removeBucket/:bucketName
app.delete("/removeBucket/:bucketName", async (req, res) => {
  try {
    let Bucketrecord = await listBuckets();
    let message;
    Bucketrecord.Buckets.filter(async function (el) {
      if (el.Name === req.params.bucketName) {
        return (message = "Bucket Deleted Successfully");
      }
    });
    if (message === "Bucket Deleted Successfully") {
      await deleteBucket(req.params.bucketName);
      return res.status(200).json({ message });
    } else {
      return res.status(404).json({ message: "No Bucket Found" });
    }
  } catch (err) {
    res.send(err);
  }
});

// [ + ] Remove Bucket
// @Params: /removeBucket/:bucketName
app.get("/signedurl/:key", async (req, res) => {
  try {
    // if we follow folder name then we can also put here
    const result = await getSignedUrl(req.params.key);
    return res.status(200).json({ result });
  } catch (err) {
    res.send(err);
  }
});

// [ + ] Remove Folder/Object Inside Bucket
// @Params: removefolder/:bucketName/:folderName
app.delete("/removefolder/:bucketName/:folderName", async (req, res) => {
  try {
    // if we follow folder name then we can also put here
    const result = await removeFolder(
      req.params.bucketName,
      req.params.folderName
    );

    return res.status(200).json({
      message: `${bucketName} Bucket / ${folderName} Deleted Successfully`,
    });
  } catch (err) {
    res.send(err);
  }
});

// [ + ] Remove Object Inside Bucket
// @Params: remove/:bucketName/:folderName
app.delete("/remove/:bucketName/:key", async (req, res) => {
  try {
    // if we follow folder name then we can also put here
    const result = await removeObj(req.params.bucketName, req.params.key);
    console.log(result);
    res.status(200).json({
      message: ` Object Deleted Successfully`,
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
