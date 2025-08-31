import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { UserAnswer } from './entities/user-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserAnswerController],
  providers: [UserAnswerService],
  imports: [TypeOrmModule.forFeature([UserAnswer])],
})
export class UserAnswerModule {}
