import { PickType } from '@nestjs/swagger';
import { BaseAdvertisementReqDto } from './base-advertisement.req.dto';

export class UpdateAdvertisementDto extends PickType(BaseAdvertisementReqDto, [
  'title',
  'body',
  'description',
  'color',
  'mileage',
  'accidents',
  'availability_of_registration',
  'prise',
]) {}
