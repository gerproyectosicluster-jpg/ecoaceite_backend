import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation.config';
import { getTypeOrmConfig } from './config/type-orm.config';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { OilCollectionsModule } from './modules/oil-collections/oil-collections.module';
import { EducationalModulesModule } from './modules/educational-modules/educational-modules.module';
import { UserProgressModule } from './modules/user-progress/user-progress.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'prod'}`,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    RestaurantModule,
    OilCollectionsModule,
    EducationalModulesModule,
    UserProgressModule,
    CertificatesModule,
    NotificationsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
