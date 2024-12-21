import * as path from 'node:path';

import {
  DeleteObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';
import getConfigs from '../../../configs/configuration';
import { CarRepository } from '../../repository/services/car.repository';
import { s3ClientMinio } from '../configs/minio-config';

dotenv.config({ path: './environments/local.env' });

const s3Config = getConfigs().s3;

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  constructor(private readonly carRepository: CarRepository) {
    this.client = s3ClientMinio;
  }

  async uploadCarPhoto(
    file: Express.Multer.File,
    carId: string,
  ): Promise<string> {
    const car = await this.carRepository.findByIdOrThrow(carId);

    if (car.image) {
      await this.deleteFileFromS3(car.image);
    }

    const filePath = this.buildPath(file.originalname, carId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: s3Config.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: s3Config.objectAcl as ObjectCannedACL,
        ContentLength: file.size,
      }),
    );
    await this.carRepository.save(car);
    return filePath;
  }

  async deleteFileFromS3(filePath: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: s3Config.bucketName,
          Key: filePath,
        }),
      );
    } catch (error) {
      throw new NotFoundException(`Delete file from S3: ${error.message}`);
    }
  }

  private buildPath(fileName: string, carId: string): string {
    return `cars/${carId}/${v4()}${path.extname(fileName)}`;
  }
}
