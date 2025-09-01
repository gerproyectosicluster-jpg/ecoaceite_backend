export const EnvConfiguration = () => ({
  NODE_ENV: process.env.NODE_ENV || 'prod',
  postgres: {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    jwt_secret: process.env.JWT_SECRET,
  },
  s3: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_BUCKET,
  },

  port: parseInt(process.env.PORT, 10) || 3000,
});
