import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { S3Service } from './services/s3.service';
import { imageFileFilter } from './utils/file-upload.utils';
import { photoConfig } from './utils/photo.config';

@ApiTags('s3')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiOperation({ summary: 'Upload photo' })
  @Post('/:carId/photo')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: photoConfig.MAX_SIZE,
      },
    }),
  )
  async uploadCarPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('carId', ParseUUIDPipe) carId: string,
  ) {
    console.log(carId);
    const urlPhoto = await this.s3Service.uploadCarPhoto(file, carId);
    return { urlPhoto };
  }

  @ApiOperation({ summary: 'Delete photo' })
  @Delete('/carId/photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCarPhoto(@Param(':carId') carId: string) {
    await this.s3Service.deleteFileFromS3(carId);
  }
}
