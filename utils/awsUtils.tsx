import { S3 } from "aws-sdk";
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } from "proenv";

const s3 = new S3({
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

export const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const putFileToS3 = async (key: any, body: any, params = {}) => {
  const imageBody = await getBlob(body);
  const data = await s3
    .putObject({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: imageBody,
      ACL: "public-read",
      ...params
    })
    .promise();
  return data;
};
