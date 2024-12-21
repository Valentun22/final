export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
  s3: S3Config;
};
export type AppConfig = {
  host: string;
  port: number;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type PostgresConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};

export type S3Config = {
  accessKeyId: string;
  secretAccessKey: string;
  objectAcl: string;
  bucketUrl: string;
  bucketName: string;
  s3Endpoint: string;
  s3Region: string;
};
