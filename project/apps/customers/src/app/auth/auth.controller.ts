import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/lib/shared/helpers';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { NewUserRdo } from './rdo/new-user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';

@ApiTags('user')
@Controller('user')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user with this email is registered.'
  })
  @Post('sign-up')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.registerUser(dto);
    return fillDto(NewUserRdo, newUser.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user successfully logged in.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The wrong email or password was entered.'
  })
  @Post('sign-in')
  @HttpCode(200)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDto(LoggedUserRdo, verifiedUser.toObject());
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user with this id not found.'
  })
  @Get(':id')
  @HttpCode(200)
  public async show(@Param('id') id: string) {
    const user = await this.authService.getUser(id);
    return fillDto(UserRdo, user.toObject());
  }
}
