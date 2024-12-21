import { UserEntity } from '../../../database/entities/user.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { TokenResDto } from '../dto/res/token.res.dto';
import { AuthUserResDto } from '../dto/res/auth-user.res.dto';

export class AuthMapper {
  public static toResponseDto(
    userEntity: UserEntity,
    tokens: TokenResDto,
  ): AuthUserResDto {
    return {
      user: UserMapper.toResponseDto(userEntity),
      tokens,
    };
  }
}
