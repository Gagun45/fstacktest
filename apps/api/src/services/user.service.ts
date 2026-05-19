import { User } from "@prisma/client";
import { COUNTRIES, ISignUpDto, IUserUpdateDto } from "@repo/shared";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { ApiError } from "../errors/api.error.js";
import { userRepository } from "../repositories/user.repository.js";

export const userService = {
  create: (dto: ISignUpDto) => {
    return userRepository.create({ data: dto });
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
