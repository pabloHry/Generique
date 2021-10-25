import AWS from "aws-sdk";
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } from "proenv";

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: "eu-west-3",
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
});

export const getFileFromS3 = async (key: any) => {
  const data = await s3.getObject({ Bucket: BUCKET_NAME, Key: key }).promise();
  return data.Body;
};

export const putFileToS3 = async (key: any, body: any, params = {}) => {
  const data = await s3
    .putObject({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: body,
      ACL: "public-read",
      ...params
    })
    .promise();
  return data;
};
