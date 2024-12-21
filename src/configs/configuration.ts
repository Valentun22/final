import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: Number(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || 'localhost',
  },
  postgres: {
    port: Number(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    env: process.env.SENTRY_ENV,
    debug: process.env.SENTRY_DEBUG === 'true',
  },
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    accessSecret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    accessExpiresIn: Number(process.env.AUTH_ACCESS_TOKEN_EXPIRATION),
    refreshSecret: process.env.AUTH_REFRESH_TOKEN_SECRET,
    refreshExpiresIn: Number(process.env.AUTH_REFRESH_TOKEN_EXPIRATION),
  },
  s3: {
    s3Region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    objectAcl: process.env.AWS_S3_OBJECT_ACL,
    bucketUrl: process.env.AWS_S3_BUCKET_URL,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    s3Endpoint: process.env.AWS_S3_ENDPOINT,
  },
});
