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
import { QuestionModule } from './modules/question/question.module';
import { UserAnswerModule } from './modules/user-answer/user-answer.module';
import { QuizResultModule } from './modules/quiz-result/quiz-result.module';
import { EducationalGuideModule } from './modules/educational-guide/educational-guide.module';
import { UserGuideUploadModule } from './modules/user-guide-upload/user-guide-upload.module';

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
    QuestionModule,
    UserAnswerModule,
    QuizResultModule,
    EducationalGuideModule,
    UserGuideUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
