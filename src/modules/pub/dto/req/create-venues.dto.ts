import { PickType } from '@nestjs/swagger';
import { BaseAdvertisementReqDto } from './base-advertisement.req.dto';

export class CreateAdvertisementDto extends PickType(BaseAdvertisementReqDto, [
  'title',
  'body',
  'description',
  'color',
  'mileage',
  'prise',
  'image',
  'car_brand',
  'availability_of_registration',
  'accidents',
  'car_model',
  'currency',
  'region',
  'year',
]) {}
