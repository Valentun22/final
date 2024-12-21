import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseUserReqDto } from '../../../user/dto/req/base-user.req.dto';
import { Type } from 'class-transformer';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'name',
  'email',
  'password',
]) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly deviceId: string;
}
