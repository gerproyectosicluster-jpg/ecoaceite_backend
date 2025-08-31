import { Module } from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { QuizResultController } from './quiz-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResult } from './entities/quiz-result.entity';

@Module({
  controllers: [QuizResultController],
  providers: [QuizResultService],
  imports: [TypeOrmModule.forFeature([QuizResult])],
})
export class QuizResultModule {}
