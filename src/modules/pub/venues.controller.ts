import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../../common/guards/role.guard';
import { RolesEnum } from '../../database/enums/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { BadWordsValidation } from './guards/bad-words-validation.guard';
import { CreateVenuesDto } from './dto/req/create-venues.dto';
import { VenuesResDto } from './dto/res/venues.res.dto';
import { UpdateVenuesDto } from './dto/req/update-venues.dto';
import { VenuesListReqDto } from './dto/req/venues-list.req.dto';
import { VenuesListResDto } from './dto/res/venues-list.res.dto';
import { RoleUser } from '../../common/decorators/check.role';
import { VenuesService } from './services/advertisement.service';

@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @ApiBearerAuth()
  @RoleUser(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN,)
  @UseGuards(BadWordsValidation, RolesGuard,)
  @ApiOperation({
    summary: 'Allowed for users with ADMIN role',
  })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateVenuesDto,
  ): Promise<VenuesResDto> {
    return await this.venuesService.create(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update venues' })
  @Put(':venuesId')
  public async update(
    @Param('venuesId', ParseUUIDPipe) venuesId: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateVenuesDto,
  ): Promise<VenuesResDto> {
    return await this.venuesService.update(
      userData,
      dto,
      venuesId,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Venues by id' })
  @Get(':venuesId')
  public async getById(
    @Param('venuesId', ParseUUIDPipe) advertisementId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<VenuesResDto> {
    return await this.venuesService.getById(userData, advertisementId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all advertisements' })
  @Get()
  public async getAll(
    @CurrentUser() userData: IUserData,
    @Query() query: VenuesListReqDto,
  ): Promise<VenuesListResDto> {
    return await this.venuesService.getAll(userData, query);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete' })
  @Delete(':advertisementId')
  public async delete(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.venuesService.delete(userData, advertisementId);
  }
}

//todo заміна на паб
