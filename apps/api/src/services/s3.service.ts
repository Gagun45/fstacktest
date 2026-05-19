import { randomUUID } from "node:crypto";
import path from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { config } from "../configs/config.js";
import { S3Folder } from "../enums/s3-folder.enum.js";
import { ApiError } from "../errors/api.error.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Client = new S3Client({
  region: config.AWS_S3_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY,
  },
});

const buildPath = (
  folder: S3Folder,
  itemId: string,
  fileName: string,
): string => `${folder}/${itemId}/${randomUUID()}${path.extname(fileName)}`;

export const s3Service = {
  uploadFile: async (file: UploadedFile, folder: S3Folder, itemId: string) => {
    try {
      const filePath = buildPath(folder, itemId, file.name);
      await s3Client.send(
        new PutObjectCommand({
          Bucket: config.AWS_S3_BUCKET_NAME,
          Key: filePath,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: config.AWS_S3_ACL,
        }),
      );
      return {
        key: filePath,
        url: `${config.AWS_S3_ENDPOINT}/${filePath}`,
      };
    } catch (e) {
      console.log("s3 upload file error: ", e);
      throw new ApiError("Upload error", 500);
    }
  },
  deleteFile: async (filePath: string): Promise<void> => {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: config.AWS_S3_BUCKET_NAME,
          Key: filePath,
        }),
      );
    } catch (error) {
      console.log("s3 delete error: ", error);
      throw new ApiError("Delete file error", 500);
    }
  },
  getPresignedUploadUrl: async (
    fileName: string,
    contentType: string,
    folder: S3Folder,
  ) => {
    const key = `${folder}/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const command = new PutObjectCommand({
      Bucket: config.AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      // ACL: 'public-read', // optional - better to use CloudFront + bucket policy
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour

    const publicUrl = `https://${config.AWS_S3_BUCKET_NAME}.s3.${config.AWS_S3_REGION}.amazonaws.com/${key}`;

    return { uploadUrl: url, key, publicUrl };
  },
  deleteFromS3: async (key: string) => {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.AWS_S3_BUCKET_NAME,
        Key: key,
      }),
    );
  },
};
