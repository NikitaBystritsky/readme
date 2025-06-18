import { AppConfig } from './app-config.interface';

export interface ApiGatewayConfig extends AppConfig {
  usersServiceURL: string;
  postsServiceURL: string;
  filesServiceURL: string;
  notificationsServiceURL: string;
  maxRedirects: number;
  clientTimeout: number;
}
