import { Module } from '@nestjs/common';
import { UserGuideUploadService } from './user-guide-upload.service';
import { UserGuideUploadController } from './user-guide-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGuideUpload } from './entities/user-guide-upload.entity';
import { EducationalGuideModule } from '../educational-guide/educational-guide.module';
import { S3Service } from 'src/util/services/s3.service';
import { UserModule } from '../user/user.module';
import { UserEducationalUnitProgressModule } from '../user_educational_unit_progress/user_educational_unit_progress.module';
import { EducationalGuide } from '../educational-guide/entities/educational-guide.entity';
import { EducationalUnit } from '../educational-unit/entities/educational-unit.entity';

@Module({
  controllers: [UserGuideUploadController],
  providers: [UserGuideUploadService, S3Service],
  imports: [
    TypeOrmModule.forFeature([
      UserGuideUpload,
      EducationalGuide,
      EducationalUnit,
    ]),
    EducationalGuideModule,
    UserModule,
    UserEducationalUnitProgressModule,
  ],
})
export class UserGuideUploadModule {}
