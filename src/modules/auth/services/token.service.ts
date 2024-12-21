import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JwtConfig } from '../../../configs/config.type';
import { TokenType } from '../enums/token-type.enum';
import { JwtPayload } from '../types/jwt-payload.type';
import { TokenResDto } from '../dto/res/token.res.dto';

@Injectable()
export class TokenService {
  private jwtConfig: JwtConfig;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
  }

  public async generateAuthTokens(
    payload: JwtPayload,
  ): Promise<TokenResDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(payload, TokenType.ACCESS),
      this.generateToken(payload, TokenType.REFRESH),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  public async verifyToken(
    token: string,
    type: TokenType,
  ): Promise<JwtPayload> {
    try {
      const secret = this.getSecret(type);

      return await this.jwtService.verifyAsync(token, { secret });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private async generateToken(
    payload: JwtPayload,
    type: TokenType,
  ): Promise<string> {
    const secret = this.getSecret(type);
    const expiresIn = this.getExpiresIn(type);

    return await this.jwtService.signAsync(payload, { expiresIn, secret });
  }

  private getSecret(type: TokenType): string {
    switch (type) {
      case TokenType.ACCESS:
        return this.jwtConfig.accessSecret;
      case TokenType.REFRESH:
        return this.jwtConfig.refreshSecret;
    }
  }

  private getExpiresIn(type: TokenType): number {
    switch (type) {
      case TokenType.ACCESS:
        return this.jwtConfig.accessExpiresIn;
      case TokenType.REFRESH:
        return this.jwtConfig.refreshExpiresIn;
    }
  }
}
