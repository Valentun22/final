import { TokenResDto } from './token.res.dto';
import { UserResDto } from '../../../user/dto/res/user.res.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class AuthUserResDto {
  tokens: TokenResDto;
  user: UserResDto;
}
