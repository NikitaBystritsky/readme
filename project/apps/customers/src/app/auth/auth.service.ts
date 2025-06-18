import { ConfigType } from '@nestjs/config';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CustomersJwtConfig } from '@project/lib/config/customers';
import { CreateUserDTO, GetUsersDTO, LoginUserDTO, UpdatePasswordDTO } from '@project/lib/shared/app/dto';
import { Token, User } from '@project/lib/shared/app/types';
import { createJWTPayload, createMessage } from '@project/lib/shared/helpers';

import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import {
  NOT_FOUND_BY_EMAIL_MESSAGE,
  NOT_FOUND_BY_ID_MESSAGE,
  TOKEN_CREATION_ERROR,
  TOKEN_GENERATE_ERROR,
  USER_EXISTS_MESSAGE,
  WRONG_PASSWORD_MESSAGE
} from './auth.constant';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(CustomersJwtConfig.KEY)private readonly jwtOptions: ConfigType<typeof CustomersJwtConfig>
  ) {}

  public async registerUser(dto: CreateUserDTO): Promise<UserEntity> {
    const user = {
      fullName: dto.fullName,
      email: dto.email,
      password: '',
      avatar: dto.avatar,
      subscriptions: []
    }
    const existUser = await this.userRepository.findByEmail(dto.email);

    if(existUser) {
      throw new ConflictException(createMessage(USER_EXISTS_MESSAGE, [dto.email]));
    }
    const userEntity = await new UserEntity(user).setPassword(dto.password);

    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDTO): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if(!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_EMAIL_MESSAGE, [dto.email]));
    }
    const isMatch = await existUser.comparePassword(dto.password);

    if(!isMatch) {
      throw new UnauthorizedException(WRONG_PASSWORD_MESSAGE);
    }

    return existUser;
  }

  public async getUser(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);

    if(!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return existUser;
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(email);

    if(!existUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_EMAIL_MESSAGE, [email]))
    }

    return existUser;
  }

  public async getByUserIds(dto: GetUsersDTO): Promise<UserEntity[]> {
    return this.userRepository.findByUserIds(dto.userIds);
  }

  public async updateUserPassword(id: string, dto: UpdatePasswordDTO): Promise<void> {
    const existUser = await this.userRepository.findById(id);
    const isMatch = await existUser.comparePassword(dto.oldPassword);

    if(!isMatch) {
      throw new UnauthorizedException(WRONG_PASSWORD_MESSAGE);
    }
    existUser.setPassword(dto.password)

    await this.userRepository.update(id, existUser);
  }

  public async createToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID()
    };

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });
      await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(createMessage(TOKEN_GENERATE_ERROR, [error.message]));
      throw new InternalServerErrorException(TOKEN_CREATION_ERROR);
    }
  }

  public async toggleSubscription(id: string, subscribeId: string): Promise<UserEntity | null> {
    const userEntity = await this.userRepository.addOrDeleteSubscription(id, subscribeId);

    return userEntity;
  }

  public async getSubscribersCount(userId: string): Promise<number> {
    return this.userRepository.getSubscribersCount(userId);
  }
}
