import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param, Post,
  UseGuards
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/lib/shared/helpers';
import { MongoIdValidationPipe } from '@project/lib/core';

import { AuthService } from './auth.service';
import { NotificationService } from '../notification/notification.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NewUserRDO } from './rdo/new-user.rdo';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { UserRDO } from './rdo/user.rdo';
import {
  AUTHENTICATION_ERROR_RESPONSE,
  EXISTING_EMAIL_RESPONSE,
  NOT_FOUND_BY_ID_RESPONSE,
  Route,
  ROUTE_PREFIX,
  SUCCESSFUL_AUTHORIZATION_RESPONSE,
  TAG,
  USER_CREATED_RESPONSE,
  VALIDATION_ERROR_RESPONSE
} from './auth.constant';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER_CREATED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: EXISTING_EMAIL_RESPONSE
  })
  @Post(Route.Registration)
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.registerUser(dto);
    await this.notificationService.registerSubscriber({email: newUser.email})

    return fillDto(NewUserRDO, newUser.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: SUCCESSFUL_AUTHORIZATION_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTHENTICATION_ERROR_RESPONSE
  })
  @Post(Route.Authentication)
  @HttpCode(200)
  public async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const token = await this.authService.createToken(verifiedUser)

    return fillDto(LoggedUserRDO, {...verifiedUser.toObject(), ...token});
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: NOT_FOUND_BY_ID_RESPONSE
  })
  @UseGuards(JwtAuthGuard)
  @Get(Route.UserParam)
  @HttpCode(200)
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.authService.getUser(id);

    return fillDto(UserRDO, user.toObject());
  }
}
