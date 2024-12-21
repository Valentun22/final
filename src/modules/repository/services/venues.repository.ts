import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AdvertisementListReqDto } from '../../advertisement/dto/req/advertisement-list.req.dto';

@Injectable()
export class AdvertisementRepository extends Repository<AdvertisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertisementEntity, dataSource.manager);
  }

  public async findByIdOrThrow(id: string): Promise<AdvertisementEntity> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('Advertisement not found');
    }
    return entity;
  }

  public async getAdvertisementById(
    advertisementId: string,
  ): Promise<AdvertisementEntity> {
    const qb = this.createQueryBuilder('advertisement');
    qb.leftJoinAndSelect('advertisement.car', 'car');
    qb.where('advertisement.id = :advertisementId');
    qb.setParameter('advertisementId', advertisementId);
    return await qb.getOne();
  }
  public async getAll(
    query: AdvertisementListReqDto,
  ): Promise<[AdvertisementEntity[], number]> {
    const qb = this.createQueryBuilder('advertisement');
    qb.leftJoinAndSelect('advertisement.car', 'car');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
