import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserEntity } from '../../../database/entities/user.entity';
import { RolesEnum } from '../../../database/enums/roles.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from './user.mapper';
import { UserResDto } from '../dto/res/user.res.dto';
import { UpdateUserDto } from '../dto/req/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findMe(userData: IUserData): Promise<UserResDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDto(entity);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserDto,
  ): Promise<UserResDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    await this.userRepository.save(this.userRepository.merge(entity, dto));
    return UserMapper.toResponseDto(entity);
  }

  public async becomeSeller(userData: IUserData): Promise<void> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    entity.roles = RolesEnum.SELLER;
    await this.userRepository.save(entity);
    throw new HttpException('It is possible to sell the car', HttpStatus.OK);
  }

  public async getPublicUser(userId: string): Promise<UserResDto> {
    const entity = await this.userRepository.getById(userId);
    return UserMapper.toResponseDto(entity);
  }

  private async findByIdOrThrow(userId: string): Promise<UserEntity> {
    const entity = await this.userRepository.findOneBy({ id: userId });
    if (!entity) {
      throw new UnprocessableEntityException('User not found');
    }
    return entity;
  }

  public async isEmailUniqOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('A unique email is required');
    }
  }

  public async delete(userData: IUserData, userId: string): Promise<void> {
    const user = await this.findByIdOrThrow(userId);
    if (user.id !== userData.userId) {
      throw new ConflictException('You can not delete this user');
    }
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
    await this.userRepository.delete({
      id: userData.userId,
    });
  }
}
