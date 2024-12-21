import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleUser } from '../../common/decorators/check.role';
import { RolesGuard } from '../../common/guards/role.guard';
import { RolesEnum } from '../../database/enums/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AdminManagerService } from './services/admin-manager.service';
import { UserResDto } from '../user/dto/res/user.res.dto';
import { BaseAdminManagerReqDto } from './dto/req/base-admin-manager.req.dto';

@ApiTags('Admin/Manager. This tag is for admin and manager roles.')
@RoleUser(RolesEnum.ADMINISTRATOR, RolesEnum.MANAGER)
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('admins/managers')
export class AdminManagerController {
  constructor(private readonly adminManagerService: AdminManagerService) {}

  @ApiOperation({ summary: 'Create a new role' })
  @Put(':userId')
  public async setNewRole(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: BaseAdminManagerReqDto,
  ): Promise<UserResDto> {
    return await this.adminManagerService.setNewRole(userData, userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Set premium account' })
  @Put('/premium:userId')
  async setPremium(@Param('userId') userId: string): Promise<void> {
    await this.adminManagerService.setPremium(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete User' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.adminManagerService.deleteUser(userId);
  }
  @ApiOperation({ summary: 'Block advertisement' })
  @Put(':advertisementId')
  async blockAdvertisement(
    @Param('advertisementId') advertisementId: string,
  ): Promise<void> {
    await this.adminManagerService.blockAdvertisement(advertisementId);
  }

  @ApiOperation({ summary: 'Unblock advertisement' })
  @Patch(':advertisementId')
  async unblockAdvertisement(
    @Param('advertisementId') advertisementId: string,
  ): Promise<void> {
    await this.adminManagerService.unblockAdvertisement(advertisementId);
  }

  @ApiOperation({ summary: 'Delete advertisement' })
  @Delete(':advertisementId')
  async delete(
    @Param('advertisementId') advertisementId: string,
  ): Promise<void> {
    await this.adminManagerService.delete(advertisementId);
  }
}
