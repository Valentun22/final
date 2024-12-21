import { Module } from '@nestjs/common';

import { AdminManagerController } from './admin-manager.controller';
import { AdminManagerService } from './services/admin-manager.service';

@Module({
  imports: [],
  controllers: [AdminManagerController],
  providers: [AdminManagerService],
  exports: [],
})
export class AdminManagerModule {}
