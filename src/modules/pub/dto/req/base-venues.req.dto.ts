import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { RegionsEnum } from '../../../../database/enums/regions.enum';
import { CurrencyEnum } from '../../../../database/enums/currency.enum';

export class BaseAdvertisementReqDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @ApiProperty()
  @IsString()
  @Length(0, 500)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty()
  @IsString()
  @Length(0, 5000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  body: string;

  @ApiProperty()
  @IsEnum(RegionsEnum)
  @Type(() => String)
  region: RegionsEnum;

  @ApiProperty()
  @IsNumber()
  @Min(1970)
  @Max(new Date().getFullYear())
  @Type(() => Number)
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 500)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  color: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(3000)
  mileage: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(2)
  @Max(1000)
  accidents: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(2)
  @Max(1000)
  availability_of_registration: string;

  @ApiProperty()
  @IsInt()
  @Min(1000)
  @Max(1000000)
  prise: number;

  @IsEnum(CurrencyEnum)
  @Type(() => String)
  currency: CurrencyEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  image: string;

  @ApiProperty()
  @IsString()
  @Transform(TransformHelper.toLowerCase)
  @Type(() => String)
  car_brand: string;

  @ApiProperty()
  @IsString()
  @Transform(TransformHelper.toLowerCase)
  @Type(() => String)
  car_model: string;
}
