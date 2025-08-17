import { Module } from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { QuizResultController } from './quiz-result.controller';

@Module({
  controllers: [QuizResultController],
  providers: [QuizResultService],
})
export class QuizResultModule {}
