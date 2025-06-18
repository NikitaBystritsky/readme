import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('customersJwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('customersJwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    }
  }
}
