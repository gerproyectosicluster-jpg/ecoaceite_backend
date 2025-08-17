import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { EducationalModule } from '../educational-modules/entities/educational-module.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(EducationalModule)
    private readonly moduleRepository: Repository<EducationalModule>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const module = await this.moduleRepository.findOne({
      where: { id: createQuestionDto.module_id },
    });
    if (!module) throw new NotFoundException('Module not found');
    const question = this.questionRepository.create({
      ...createQuestionDto,
      module,
    });
    return await this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find({ relations: ['module'] });
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['module'],
    });
    if (!question) throw new NotFoundException(`Question #${id} not found`);
    return question;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.findOne(id);
    Object.assign(question, updateQuestionDto);
    return await this.questionRepository.save(question);
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
  }
}
