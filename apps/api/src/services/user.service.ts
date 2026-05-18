import { User } from "@prisma/client";
import { UploadedFile } from "express-fileupload";
import { userRepository } from "../repositories/user.repository.js";
import { COUNTRIES, ISignUpDto, IUserUpdateDto } from "@repo/shared";
import { ApiError } from "../errors/api.error.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { s3Service } from "./s3.service.js";
import { S3Folder } from "../enums/s3-folder.enum.js";

export const userService = {
  create: (dto: ISignUpDto) => {
    return userRepository.create({ data: dto });
  },
  uploadAvatar: async (userId: number, file: UploadedFile): Promise<User> => {
    const user = await userRepository.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    const { avatar: oldAvatar } = user;
    const avatar = await s3Service.uploadFile(
      file,
      S3Folder.USER,
      userId.toString(),
    );
    const updatedUser = await userRepository.update({
      where: {
        id: userId,
      },
      data: {
        avatar,
      },
    });
    if (oldAvatar) await s3Service.deleteFile(oldAvatar);
    return updatedUser;
  },
  updateProfile: async (userId: number, dto: IUserUpdateDto): Promise<User> => {
    if (dto.country) {
      const existingCountry = COUNTRIES.find(
        (c) => c.toLowerCase() === dto.country?.toLowerCase(),
      );
      if (!existingCountry) {
        throw new ApiError(
          `Invalid country: ${dto.country}`,
          StatusCodesEnum.BAD_REQUEST,
        );
      }
      dto.country = existingCountry;
    }
    const updatedUser = await userRepository.update({
      where: { id: userId },
      data: dto,
    });
    return updatedUser;
  },
};
