import { ConflictException, Injectable } from '@nestjs/common';

import { AccountTypeEnum } from '../../../database/enums/account-type.enum';
import { StatusTypeEnum } from '../../../database/enums/status-type.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AdvertisementRepository } from '../../repository/services/advertisement.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../user/services/user.mapper';
import { UserResDto } from '../../user/dto/res/user.res.dto';
import { BaseAdminManagerReqDto } from '../dto/req/base-admin-manager.req.dto';

@Injectable()
export class AdminManagerService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly advertisementRepository: AdvertisementRepository,
  ) {}

  public async setNewRole(
    userData: IUserData,
    userId: string,
    dto: BaseAdminManagerReqDto,
  ): Promise<UserResDto> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    if (userEntity.roles === dto.roles) {
      throw new ConflictException('User already has this role');
    }
    userEntity.roles = dto.roles;
    await this.userRepository.save(userEntity);
    return UserMapper.toResponseDto(userEntity);
  }

  public async setPremium(userId: string): Promise<void> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    if (userEntity.accountType === AccountTypeEnum.PREMIUM_ACCOUNT) {
      throw new ConflictException('User already has PREMIUM account');
    }
    userEntity.accountType = AccountTypeEnum.PREMIUM_ACCOUNT;
    await this.userRepository.save(userEntity);
  }

  public async deleteUser(userId: string): Promise<void> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    await this.userRepository.delete(userEntity);
  }

  public async blockAdvertisement(advertisementId: string): Promise<void> {
    const entity =
      await this.advertisementRepository.findByIdOrThrow(advertisementId);
    if (entity.status === StatusTypeEnum.BLOCKED) {
      throw new ConflictException('Advertisement is already blocked');
    }
    entity.status = StatusTypeEnum.BLOCKED;
    await this.advertisementRepository.save(entity);
  }

  public async unblockAdvertisement(advertisementId: string): Promise<void> {
    const entity =
      await this.advertisementRepository.findByIdOrThrow(advertisementId);
    if (entity.status === StatusTypeEnum.ACTIVE) {
      throw new ConflictException('Advertisement is already active');
    }
    entity.status = StatusTypeEnum.ACTIVE;
    await this.advertisementRepository.save(entity);
  }

  public async delete(advertisementId: string): Promise<void> {
    const entity =
      await this.advertisementRepository.findByIdOrThrow(advertisementId);
    await this.advertisementRepository.delete(entity);
  }
}
