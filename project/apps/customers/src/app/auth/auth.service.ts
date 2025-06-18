import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

import { Token, TokenPayload, User } from '@project/lib/shared/app/types';
import { createMessage } from '@project/lib/shared/helpers';

import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import {
  NOT_FOUND_BY_EMAIL_MESSAGE,
  NOT_FOUND_BY_ID_MESSAGE,
  TOKEN_CREATION_ERROR,
  TOKEN_GENERATE_ERROR,
  USER_EXISTS_MESSAGE,
  WRONG_PASSWORD_MESSAGE
} from './auth.constant';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async registerUser(dto: CreateUserDTO): Promise<UserEntity> {
    const user = {
      fullName: dto.fullName,
      email: dto.email,
      password: '',
      avatar: dto.avatar
    }
    const existUser = await this.userRepository.findByEmail(dto.email);

    if(existUser) {
      throw new NotFoundException(createMessage(USER_EXISTS_MESSAGE, [dto.email]));
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

  public async createToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      createdAt: user.createdAt
    }

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return {accessToken};
    } catch (error) {
      this.logger.error(createMessage(TOKEN_GENERATE_ERROR, [error.message]));
      throw new HttpException(TOKEN_CREATION_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
