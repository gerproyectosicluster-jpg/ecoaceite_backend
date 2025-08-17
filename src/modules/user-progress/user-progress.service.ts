import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from './entities/user-progress.entity';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';

@Injectable()
export class UserProgressService {
  constructor(
    @InjectRepository(UserProgress)
    private readonly userProgressRepository: Repository<UserProgress>,
  ) {}

  async create(
    createUserProgressDto: CreateUserProgressDto,
  ): Promise<UserProgress> {
    const userProgress = this.userProgressRepository.create({
      ...createUserProgressDto,
      user: { id: createUserProgressDto.user_id } as any,
      module: { id: createUserProgressDto.module_id } as any,
      last_accessed: createUserProgressDto.last_accessed
        ? new Date(createUserProgressDto.last_accessed)
        : new Date(),
      completion_date: createUserProgressDto.completion_date
        ? new Date(createUserProgressDto.completion_date)
        : undefined,
    });
    return await this.userProgressRepository.save(userProgress);
  }

  async findAll(): Promise<UserProgress[]> {
    return await this.userProgressRepository.find({
      relations: ['user', 'module'],
    });
  }

  async findOne(id: string): Promise<UserProgress> {
    const userProgress = await this.userProgressRepository.findOne({
      where: { id },
      relations: ['user', 'module'],
    });
    if (!userProgress)
      throw new NotFoundException(`UserProgress #${id} not found`);
    return userProgress;
  }

  async update(
    id: string,
    updateUserProgressDto: UpdateUserProgressDto,
  ): Promise<UserProgress> {
    const userProgress = await this.findOne(id);
    Object.assign(userProgress, updateUserProgressDto);
    return await this.userProgressRepository.save(userProgress);
  }

  async remove(id: string): Promise<void> {
    const userProgress = await this.findOne(id);
    await this.userProgressRepository.remove(userProgress);
  }
}
