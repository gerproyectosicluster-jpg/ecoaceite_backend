import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { UpdateQuizResultDto } from './dto/update-quiz-result.dto';

@Controller('quiz-result')
export class QuizResultController {
  constructor(private readonly quizResultService: QuizResultService) {}

  @Post()
  create(@Body() createQuizResultDto: CreateQuizResultDto) {
    return this.quizResultService.create(createQuizResultDto);
  }

  @Get()
  findAll() {
    return this.quizResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizResultService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizResultDto: UpdateQuizResultDto,
  ) {
    return this.quizResultService.update(+id, updateQuizResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizResultService.remove(+id);
  }
}
