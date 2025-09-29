import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';
import { SubmitUserAnswersDto } from './dto/submit-user-answers.dto';
import { Response } from 'express';

@Controller('user-answer')
export class UserAnswerController {
  constructor(private readonly userAnswerService: UserAnswerService) {}

  @Post()
  create(@Body() createUserAnswerDto: CreateUserAnswerDto) {
    return this.userAnswerService.create(createUserAnswerDto);
  }

  @Post('submit')
  async submitAnswers(@Body() submitUserAnswersDto: SubmitUserAnswersDto) {
    return this.userAnswerService.submitAnswers(submitUserAnswersDto);
  }

  @Get('section-averages/:userId/:moduleType')
  getSectionAveragesByUserAndModuleType(
    @Param('userId') userId: string,
    @Param('moduleType') moduleType: string,
  ) {
    return this.userAnswerService.getSectionAveragesByUserAndModuleType(
      userId,
      moduleType,
    );
  }

  @Get('all-section-averages/:userId')
  getAllSectionAveragesByUser(@Param('userId') userId: string) {
    return this.userAnswerService.getAllSectionAveragesByUser(userId);
  }

  @Get('export/excel/:moduleId')
  async exportAnswersToExcel(
    @Param('moduleId') moduleId: string,
    @Res() res: Response,
  ) {
    return this.userAnswerService.exportAnswersToExcel(moduleId, res);
  }

  @Get()
  findAll() {
    return this.userAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAnswerDto: UpdateUserAnswerDto,
  ) {
    return this.userAnswerService.update(id, updateUserAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswerService.remove(id);
  }
}
