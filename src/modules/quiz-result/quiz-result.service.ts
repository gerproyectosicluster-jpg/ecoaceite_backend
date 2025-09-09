import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizResult } from './entities/quiz-result.entity';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { UpdateQuizResultDto } from './dto/update-quiz-result.dto';

@Injectable()
export class QuizResultService {
  constructor(
    @InjectRepository(QuizResult)
    private readonly quizResultRepository: Repository<QuizResult>,
  ) {}

  async create(createQuizResultDto: CreateQuizResultDto): Promise<QuizResult> {
    const quizResult = this.quizResultRepository.create(createQuizResultDto);
    return await this.quizResultRepository.save(quizResult);
  }

  async findAll(): Promise<QuizResult[]> {
    return await this.quizResultRepository.find();
  }

  async findOne(id: string): Promise<QuizResult> {
    const result = await this.quizResultRepository.findOne({ where: { id } });
    if (!result) throw new NotFoundException(`QuizResult #${id} not found`);
    return result;
  }

  async findByUser(userId: string): Promise<QuizResult[]> {
    return await this.quizResultRepository.find({
      where: { user: { id: userId } },
      relations: ['module'],
    });
  }

  async update(
    id: string,
    updateQuizResultDto: UpdateQuizResultDto,
  ): Promise<QuizResult> {
    const result = await this.findOne(id);
    Object.assign(result, updateQuizResultDto);
    return await this.quizResultRepository.save(result);
  }

  async remove(id: string): Promise<void> {
    const result = await this.findOne(id);
    await this.quizResultRepository.remove(result);
  }
}
