import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserProgressController } from './user-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './entities/user-progress.entity';

@Module({
  controllers: [UserProgressController],
  providers: [UserProgressService],
  imports: [TypeOrmModule.forFeature([UserProgress])],
})
export class UserProgressModule {}
