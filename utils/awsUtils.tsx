import AWS from "aws-sdk";

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: "eu-west-3",
  credentials: {
    accessKeyId: "AKIA3U2HSEISYH5VCHFP",
    secretAccessKey: "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"
  }
});

export const getFileFromS3 = async (key: any) => {
  const data = await s3
    .getObject({ Bucket: "pablo-hanry-bucket", Key: key })
    .promise();
  return data.Body;
};

export const putFileToS3 = async (key: any, body: any, params = {}) => {
  const data = await s3
    .putObject({
      Bucket: "pablo-hanry-bucket",
      Key: key,
      Body: body,
      ACL: "public-read",
      ...params
    })
    .promise();
  return data;
};
