import { Module } from '@nestjs/common';

import { VenuesController } from './advertisement.controller';
import { VenuesService } from './services/advertisement.service';
import { CurrencyService } from './services/currency.service';

@Module({
  controllers: [VenuesController],
  providers: [VenuesService, CurrencyService],
  exports: [],
})
export class AdvertisementModule {}
