import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { S3Controller } from './s3.controller';
import { S3Service } from './services/s3.service';

dotenv.config({ path: './environments/local.env' });

@Module({
  imports: [],
  controllers: [S3Controller],
  providers: [S3Service],
})
export class S3Module {}
