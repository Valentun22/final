import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configuration';
import { AdminManagerModule } from './admin-manager/admin-manager.module';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { AuthModule } from './auth/auth.module';
import { CarBrandModelModule } from './car-brand-model/car-brand-model.module';
import { HealthModule } from './health/health.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { S3Module } from './s3/s3.module';
// import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AdminManagerModule,
    AdvertisementModule,
    CarBrandModelModule,
    LoggerModule,
    HealthModule,
    RepositoryModule,
    S3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
