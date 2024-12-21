import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StatisticEntity } from '../../../database/entities/statistic.entity';

@Injectable()
export class StatisticRepository extends Repository<StatisticEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StatisticEntity, dataSource.manager);
  }
}
