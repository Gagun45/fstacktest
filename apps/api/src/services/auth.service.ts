import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../errors/api.error.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { hashService } from "./hash.service.js";
import { tokenService } from "./token.service.js";
import { actionTokenService } from "./action-token.service.js";
import { ActionTokenType } from "@prisma/client";
import { actionTokenConfig } from "../configs/action-token.config.js";
import { actionTokenRepository } from "../repositories/action-token.repository.js";
import { emailService } from "./email.service.js";
import { EmailTypeEnum } from "../enums/email-types.enum.js";
import { userService } from "./user.service.js";
import { TokenTypesEnum } from "../enums/token-types.enum.js";
import { tokenRepository } from "../repositories/token.repository.js";
import { ISignInDto, ISignUpDto } from "@repo/shared";

export const authService = {
  signUp: async (dto: ISignUpDto) => {
    const existingUser = await userRepository.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });
    if (existingUser) {
      const field = existingUser.email === dto.email ? "Email" : "Username";
      throw new ApiError(`${field} is already taken`, StatusCodesEnum.CONFLICT);
    }
    const password = await hashService.hash(dto.password);
    const newUser = await userService.create({ ...dto, password });
    const { id, role, username } = newUser;
    const tokens = await tokenService.generateTokens({
      id,
      role,
      username,
    });
    const verificationToken = actionTokenService.generate();
    const type = ActionTokenType.VERIFY_ACCOUNT;
    const { expiresAt } = actionTokenConfig[type];
    await actionTokenRepository.create({
      token: verificationToken,
      type,
      userId: id,
      expiresAt,
    });
    const verificationLink = `http://localhost:3000/auth/verify-account?token=${verificationToken}`;
    await emailService.sendEmail(EmailTypeEnum.WELCOME, newUser.email, {
      name: newUser.name,
      verificationLink,
    });
    return { user: newUser, tokens };
  },
  signIn: async (dto: ISignInDto) => {
    const user = await userRepository.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new ApiError("Invalid credentials", StatusCodesEnum.UNAUTHORIZED);
    const { password } = user;
    const isPasswordCorrect = await hashService.compare(dto.password, password);
    if (!isPasswordCorrect)
      throw new ApiError("Invalid credentials", StatusCodesEnum.UNAUTHORIZED);
    const { id, role, username } = user;
    const tokens = await tokenService.generateTokens({
      id,
      role,
      username,
    });
    return {
      tokens,
      user,
    };
  },
  refresh: async (refreshToken: string) => {
    const tokenPayload = tokenService.verifyToken(
      refreshToken,
      TokenTypesEnum.REFRESH,
    );
    const existingToken = await tokenRepository.findOne(refreshToken);
    if (!existingToken)
      throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);

    const user = await userRepository.findUnique({
      where: {
        id: tokenPayload.id,
      },
    });
    if (!user) throw new ApiError("Unauthorized", StatusCodesEnum.UNAUTHORIZED);

    await tokenRepository.deleteOne(refreshToken);
    const tokens = await tokenService.generateTokens({
      id: user.id,
      role: user.role,
      username: user.username,
    });
    return { user, tokens };
  },
  logout: async (refreshToken: string) => {
    tokenRepository.deleteOne(refreshToken);
  },
};
