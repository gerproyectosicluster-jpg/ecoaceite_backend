import { Module } from '@nestjs/common';
import { UserGuideUploadService } from './user-guide-upload.service';
import { UserGuideUploadController } from './user-guide-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGuideUpload } from './entities/user-guide-upload.entity';
import { EducationalGuideModule } from '../educational-guide/educational-guide.module';

@Module({
  controllers: [UserGuideUploadController],
  providers: [UserGuideUploadService],
  imports: [
    TypeOrmModule.forFeature([UserGuideUpload]),
    EducationalGuideModule,
  ],
})
export class UserGuideUploadModule {}
