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

const s3Client = new S3Client({
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
  uploadFile: async (
    file: UploadedFile,
    folder: S3Folder,
    itemId: string,
  ): Promise<string> => {
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
      return filePath;
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
};
