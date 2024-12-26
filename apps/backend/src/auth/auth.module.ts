import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from '~/config/config.env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.model';

const config = new ConfigService();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: config.get('APP_JWT_SECRET') || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
