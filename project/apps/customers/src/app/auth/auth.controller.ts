import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param, Patch, Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '@project/lib/core';
import { CreateUserDTO, GetUsersDTO, UpdatePasswordDTO } from '@project/lib/shared/app/dto';
import { AuthenticatedUserRDO, CreatedUserRDO, UserInfoRDO, UserRDO } from '@project/lib/shared/app/rdo';
import { RequestWithTokenPayload, RequestWithUser, Route } from '@project/lib/shared/app/types';
import { fillDto } from '@project/lib/shared/helpers';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { NotificationService } from '../notification/notification.service';

import { JWTAuthGuard } from './guards/jwt-auth.guard';
import {
  AUTHENTICATION_ERROR_RESPONSE,
  EXISTING_EMAIL_RESPONSE,
  GET_TOKEN_RESPONSE,
  NOT_FOUND_BY_ID_RESPONSE,
  ROUTE_PREFIX,
  SUCCESSFUL_AUTHORIZATION_RESPONSE,
  TAG,
  USER_CREATED_RESPONSE,
  USER_UPDATED_RESPONSE,
  VALIDATION_ERROR_RESPONSE
} from './auth.constant';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { PostService } from '../post/post.service';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly postService: PostService
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
    await this.notificationService.registerSubscriber({ email: newUser.email })

    return fillDto(CreatedUserRDO, newUser.toObject());
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
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    const token = await this.authService.createToken(user)

    return fillDto(AuthenticatedUserRDO, { ...user, ...token });
  }

  @Get(Route.Root)
  @HttpCode(HttpStatus.OK)
  public async getUserInfo(@Query('userId') userId: string) {
    const userEntity = await this.authService.getUser(userId);
    userEntity.postCount = await this.postService.getPostsCount({ userId });
    userEntity.subscribersCount = await this.authService.getSubscribersCount(userId);

    return fillDto(UserInfoRDO, userEntity.toObject());
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: NOT_FOUND_BY_ID_RESPONSE
  })
  @Get(Route.Param)
  @HttpCode(HttpStatus.OK)
  public async show(@Param('id') id: string) {
    const userEntity = await this.authService.getUser(id);

    return fillDto(UserRDO, userEntity.toObject());
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: NOT_FOUND_BY_ID_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTHENTICATION_ERROR_RESPONSE
  })
  @UseGuards(JWTAuthGuard)
  @Get(Route.Subscribers)
  @HttpCode(HttpStatus.OK)
  public async getSubscriptions(@Param('id') id: string) {
    const userEntity = await this.authService.getUser(id);

    return userEntity.toObject().subscriptions;
  }

  @Post(Route.Root)
  @HttpCode(HttpStatus.OK)
  public async index(@Body() dto: GetUsersDTO) {
    const usersEntity = await this.authService.getByUserIds(dto);

    return fillDto(UserRDO, usersEntity.map((userEntity) => userEntity.toObject()));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_UPDATED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTHENTICATION_ERROR_RESPONSE
  })
  @UseGuards(JWTAuthGuard)
  @Patch(Route.Update)
  public async updatePassword(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() dto: UpdatePasswordDTO
  ) {
    await this.authService.updateUserPassword(id, dto);
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: NOT_FOUND_BY_ID_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTHENTICATION_ERROR_RESPONSE
  })
  @UseGuards(JWTAuthGuard)
  @Post(Route.Subscribe)
  @HttpCode(HttpStatus.OK)
  public async subscribe(
    @Param('id') id: string,
    @Query('userId') subscribeId: string,
  ) {
    const userEntity = await this.authService.toggleSubscription(id, subscribeId);

    return fillDto(UserInfoRDO, userEntity.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: GET_TOKEN_RESPONSE
  })
  @UseGuards(JWTRefreshGuard)
  @Post(Route.Refresh)
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createToken(user);
  }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTHENTICATION_ERROR_RESPONSE,
  })
  @UseGuards(JWTAuthGuard)
  @Post(Route.Check)
  public async checkToken(@Req() { user }: RequestWithTokenPayload) {
    return user;
  }
}
