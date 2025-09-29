import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';
import { SubmitUserAnswersDto } from './dto/submit-user-answers.dto';
import { QuizResult } from '../quiz-result/entities/quiz-result.entity';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { Question } from '../question/entities/question.entity';

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

    // Solo considerar los primeros 20 elementos para el score
    const first20 = answers.slice(0, 20);
    const total = first20.reduce((sum, ans) => sum + ans.selected_option, 0);
    const score = first20.length > 0 ? total / first20.length : 0;

    // Guardar resultado en quiz result
    const quizResult = this.quizResultRepository.create({
      user: { id: dto.user_id } as any,
      module: { id: dto.module_id } as any,
      score: Math.round(score * 100) / 100,
    });
    await this.quizResultRepository.save(quizResult);

    return { success: true, count: answers.length, score: quizResult.score };
  }

  async getSectionAveragesByUserAndModuleType(
    userId: string,
    moduleType: string,
  ): Promise<Record<string, number>> {
    const answers = await this.userAnswerRepository.find({
      where: { user: { id: userId } },
      relations: ['question', 'question.module'],
    });

    // Filtrar solo respuestas de preguntas cuyo módulo sea del tipo solicitado
    const filteredAnswers = answers.filter(
      (answer) => answer.question.module?.type === moduleType,
    );

    const sectionMap: Record<string, { total: number; count: number }> = {};

    for (const answer of filteredAnswers) {
      const section = answer.question.section;
      if (!sectionMap[section]) {
        sectionMap[section] = { total: 0, count: 0 };
      }
      sectionMap[section].total += answer.selected_option;
      sectionMap[section].count += 1;
    }

    const result: Record<string, number> = {};
    for (const section in sectionMap) {
      result[section] = Number(
        (sectionMap[section].total / sectionMap[section].count).toFixed(2),
      );
    }

    return result;
  }

  async getAllSectionAveragesByUser(
    userId: string,
  ): Promise<Record<string, Record<string, number>>> {
    const answers = await this.userAnswerRepository.find({
      where: { user: { id: userId } },
      relations: ['question', 'question.module'],
    });

    // Agrupar por tipo de módulo y sección
    const typeSectionMap: Record<
      string,
      Record<string, { total: number; count: number }>
    > = {};

    for (const answer of answers) {
      const moduleType = answer.question.module?.type;
      const section = answer.question.section;
      if (!moduleType) continue;
      if (!typeSectionMap[moduleType]) {
        typeSectionMap[moduleType] = {};
      }
      if (!typeSectionMap[moduleType][section]) {
        typeSectionMap[moduleType][section] = { total: 0, count: 0 };
      }
      typeSectionMap[moduleType][section].total += answer.selected_option;
      typeSectionMap[moduleType][section].count += 1;
    }

    // Calcular promedios
    const result: Record<string, Record<string, number>> = {};
    for (const moduleType in typeSectionMap) {
      result[moduleType] = {};
      for (const section in typeSectionMap[moduleType]) {
        const { total, count } = typeSectionMap[moduleType][section];
        result[moduleType][section] = Number((total / count).toFixed(2));
      }
    }

    return result;
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

  async exportAnswersToExcel(moduleId: string, res: Response): Promise<void> {
    // 1. Obtener todas las preguntas del módulo ordenadas
    const questions = await this.userAnswerRepository.manager
      .getRepository(Question)
      .createQueryBuilder('question')
      .where('question.moduleId = :moduleId', { moduleId })
      .orderBy('question.order', 'ASC')
      .getMany();

    // 2. Obtener todas las respuestas de esas preguntas con usuario y pregunta
    const questionIds = questions.map((q) => q.id);
    const answers = await this.userAnswerRepository.find({
      where: { question: In(questionIds) },
      relations: ['user', 'question'],
    });

    // 3. Agrupar respuestas por usuario
    const userMap: Record<
      string,
      { name: string; answers: Record<string, number> }
    > = {};
    for (const ans of answers) {
      if (!userMap[ans.user.id]) {
        userMap[ans.user.id] = { name: ans.user.name, answers: {} };
      }
      userMap[ans.user.id].answers[ans.question.id] = ans.selected_option;
    }

    // 4. Crear el workbook y worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('User Answers');

    // 5. Crear encabezados
    const headers = [
      { header: 'user_id', key: 'user_id' },
      { header: 'user_name', key: 'user_name' },
      ...questions.map((q) => ({ header: q.text, key: q.id })),
    ];
    worksheet.columns = headers;

    // 6. Agregar filas
    for (const [userId, { name, answers }] of Object.entries(userMap)) {
      const row: Record<string, any> = {
        user_id: userId,
        user_name: name,
      };
      for (const q of questions) {
        row[q.id] = answers[q.id] ?? '';
      }
      worksheet.addRow(row);
    }

    // 7. Enviar el archivo como respuesta
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="user_answers.xlsx"',
    );
    await workbook.xlsx.write(res);
    res.end();
  }
}
