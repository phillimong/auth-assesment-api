import { Controller, Request, Post, UseGuards, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    res.cookie('user_token', this.authService.login(req.user), {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
      domain: 'localhost',
      expires: new Date(Date.now() + 36000),
    });
    return this.authService.login(req.user);
  }
  @Get('auth/logout')
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('user_token', '', {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
      domain: 'localhost',
      expires: new Date(Date.now()),
    });
    return {};
  }
}
