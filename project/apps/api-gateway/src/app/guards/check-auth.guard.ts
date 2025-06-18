import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';

import { ApiGatewayAppConfig } from '@project/lib/config/api-gateway';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(ApiGatewayAppConfig.KEY) private readonly apiGatewayOptions: ConfigType<typeof ApiGatewayAppConfig>
  ) {}

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const url = new URL('check', this.apiGatewayOptions.usersServiceURL).toString();
    const { data } = await this.httpService.axiosRef.post(url, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    })
    request['user'] = data;

    return true;
  }
}
