import * as dotenv from 'dotenv';
import getConfigs from '../../../configs/configuration';
import { S3Client } from '@aws-sdk/client-s3';

dotenv.config({ path: './environments/local.env' });

const s3Config = getConfigs().s3;
export const s3ClientMinio = new S3Client({
  region: s3Config.s3Region,
  endpoint: s3Config.bucketUrl,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
  forcePathStyle: true,
});
