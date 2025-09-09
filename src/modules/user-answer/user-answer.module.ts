import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { UserAnswer } from './entities/user-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResult } from '../quiz-result/entities/quiz-result.entity';

@Module({
  controllers: [UserAnswerController],
  providers: [UserAnswerService],
  imports: [TypeOrmModule.forFeature([UserAnswer, QuizResult])],
  exports: [TypeOrmModule],
})
export class UserAnswerModule {}
