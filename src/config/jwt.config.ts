import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return { secret: configService.get<string>('JWT_SECRET') };
};
