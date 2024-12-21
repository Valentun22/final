import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { RolesEnum } from '../../../../database/enums/roles.enum';
import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseAdminManagerReqDto {
  @ApiProperty()
  @IsEnum(RolesEnum)
  @Transform(TransformHelper.toUpperCase)
  @Type(() => String)
  roles: RolesEnum;
}
