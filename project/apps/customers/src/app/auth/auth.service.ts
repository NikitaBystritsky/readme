import { ConflictException, Injectable } from '@nestjs/common';

import { createMessage } from '@project/lib/shared/helpers';

import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ErrorMessage } from './auth.constant';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async registerUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = {
      fullName: dto.fullName,
      email: dto.email,
      password: '',
      avatar: dto.avatar
    }
    const existUser = await this.userRepository.findByEmail(dto.email);

    if(existUser) {
      throw new ConflictException(createMessage(ErrorMessage.USER_EXISTS_MESSAGE, [dto.email]));
    }
    const userEntity = await new UserEntity(user).setPassword(dto.password);

    return this.userRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if(!existUser) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_EMAIL_MESSAGE, [dto.email]));
    }
    const isMatch = await existUser.comparePassword(dto.password);

    if(!isMatch) {
      throw new ConflictException(ErrorMessage.WRONG_PASSWORD_MESSAGE);
    }

    return existUser;
  }

  public async getUser(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);

    if(!existUser) {
      throw new ConflictException(createMessage(ErrorMessage.NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return existUser;
  }
}
