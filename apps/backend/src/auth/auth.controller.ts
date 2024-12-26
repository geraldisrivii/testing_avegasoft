import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/auth/auth.service';
import { Auth, CreateUser, LoginUser, Refresh } from '~/auth/auth.model';
import { CreateUserDTO } from '@internal/dto/dto.user';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, type: Auth })
  @Post('/register')
  register(@Body() dto: CreateUser) {
    return this.authService.createUser(dto);
  }

  @ApiResponse({ status: 200, type: Auth })
  @Post('/login')
  login(@Body() dto: LoginUser) {
    return this.authService.login(dto);
  }

  @ApiResponse({ status: 200, type: Auth })
  @Post('/refresh')
  refresh(@Body() dto: Refresh) {
    return this.authService.refresh(dto);
  }
}
