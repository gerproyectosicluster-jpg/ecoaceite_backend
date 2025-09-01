import { Module } from '@nestjs/common';
import { UserGuideProgressService } from './user_guide_progress.service';
import { UserGuideProgressController } from './user_guide_progress.controller';

@Module({
  controllers: [UserGuideProgressController],
  providers: [UserGuideProgressService],
})
export class UserGuideProgressModule {}
