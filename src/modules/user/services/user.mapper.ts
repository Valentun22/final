import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../dto/res/user.res.dto';

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResDto {
    return {
      bio: userEntity.bio,
      email: userEntity.email,
      id: userEntity.id,
      image: userEntity.image,
      name: userEntity.name,
      accountType: userEntity.accountType,
      role: userEntity.roles,
    };
  }
}
