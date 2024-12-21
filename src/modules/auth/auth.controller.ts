import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';
import { SignUpReqDto } from './dto/req/sign-up.req.dto';
import { AuthUserResDto } from './dto/res/auth-user.res.dto';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { TokenResDto } from './dto/res/token.res.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @ApiOperation({ summary: 'Sign-up' })
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthUserResDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Auth ADMIN' })
  @Post('sign-up/admin')
  public async signUpAdmin(@Body() dto: SignUpReqDto): Promise<AuthUserResDto> {
    return await this.authService.signUpAdmin(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthUserResDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  public async logout(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.logout(userData);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh' })
  @Post('refresh')
  public async updateRefreshToken(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenResDto> {
    return await this.authService.refreshToken(userData);
  }
}
