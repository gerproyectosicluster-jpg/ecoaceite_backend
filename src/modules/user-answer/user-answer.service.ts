import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';

@Injectable()
export class UserAnswerService {
  constructor(
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
  ) {}

  async create(createUserAnswerDto: CreateUserAnswerDto): Promise<UserAnswer> {
    const userAnswer = this.userAnswerRepository.create(createUserAnswerDto);
    return await this.userAnswerRepository.save(userAnswer);
  }

  async findAll(): Promise<UserAnswer[]> {
    return await this.userAnswerRepository.find();
  }

  async findOne(id: string): Promise<UserAnswer> {
    const answer = await this.userAnswerRepository.findOne({ where: { id } });
    if (!answer) throw new NotFoundException(`UserAnswer #${id} not found`);
    return answer;
  }

  async update(
    id: string,
    updateUserAnswerDto: UpdateUserAnswerDto,
  ): Promise<UserAnswer> {
    const answer = await this.findOne(id);
    Object.assign(answer, updateUserAnswerDto);
    return await this.userAnswerRepository.save(answer);
  }

  async remove(id: string): Promise<void> {
    const answer = await this.findOne(id);
    await this.userAnswerRepository.remove(answer);
  }
}
