import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';
import { SubmitUserAnswersDto } from './dto/submit-user-answers.dto';
import { QuizResult } from '../quiz-result/entities/quiz-result.entity';

@Injectable()
export class UserAnswerService {
  constructor(
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
    @InjectRepository(QuizResult)
    private readonly quizResultRepository: Repository<QuizResult>,
  ) {}

  async create(createUserAnswerDto: CreateUserAnswerDto): Promise<UserAnswer> {
    const userAnswer = this.userAnswerRepository.create(createUserAnswerDto);
    return await this.userAnswerRepository.save(userAnswer);
  }

  async submitAnswers(dto: SubmitUserAnswersDto): Promise<any> {
    const answers = dto.answers.map((ans) =>
      this.userAnswerRepository.create({
        question: { id: ans.question_id } as any,
        user: { id: dto.user_id } as any,
        selected_option: ans.selected_option,
      }),
    );

    await this.userAnswerRepository.save(answers);
    const total = answers.reduce((sum, ans) => sum + ans.selected_option, 0);
    const score = answers.length > 0 ? total / answers.length : 0;

    // Guardar resultado en quiz result
    const quizResult = this.quizResultRepository.create({
      user: { id: dto.user_id } as any,
      module: { id: dto.module_id } as any,
      score: Math.round(score * 100) / 100,
    });
    await this.quizResultRepository.save(quizResult);

    return { success: true, count: answers.length, score: quizResult.score };
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
