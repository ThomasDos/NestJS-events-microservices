import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@shared/decorator/current-user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signIn(@CurrentUser() user) {
    const access_token = this.authService.getTokenForUser(user);
    return { access_token };
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}
