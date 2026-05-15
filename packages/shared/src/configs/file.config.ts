import { FileTypeEnum } from "../enums/enums";
import { FileOptionsType } from "../types/general.types";

export const FileConfig: Record<FileTypeEnum, FileOptionsType> = {
  avatar: {
    allowedMimeTypes: ["image/jpeg", "image/png"],
    maxSize: 5 * 1024 * 1024,
  },
  poster: {
    allowedMimeTypes: ["image/jpeg", "image/png"],
    maxSize: 5 * 1024 * 1024,
  },
};
