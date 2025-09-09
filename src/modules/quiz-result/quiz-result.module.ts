import { Module } from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { QuizResultController } from './quiz-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResult } from './entities/quiz-result.entity';
import { UserAnswerModule } from '../user-answer/user-answer.module';

@Module({
  controllers: [QuizResultController],
  providers: [QuizResultService],
  imports: [TypeOrmModule.forFeature([QuizResult]), UserAnswerModule],
  exports: [TypeOrmModule],
})
export class QuizResultModule {}
