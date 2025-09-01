import { Module } from '@nestjs/common';
import { UserGuideUploadService } from './user-guide-upload.service';
import { UserGuideUploadController } from './user-guide-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGuideUpload } from './entities/user-guide-upload.entity';
import { EducationalGuideModule } from '../educational-guide/educational-guide.module';
import { S3Service } from 'src/util/services/s3.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [UserGuideUploadController],
  providers: [UserGuideUploadService, S3Service],
  imports: [
    TypeOrmModule.forFeature([UserGuideUpload]),
    EducationalGuideModule,
    UserModule,
  ],
})
export class UserGuideUploadModule {}
