require("dotenv").config({ path: "./config.env" });
module.exports = {
  AWS_BUCKET,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  PORT,
  AWS_SDK_LOAD_CONFIG,
} = process.env;
