import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEducationalUnitProgress } from './entities/user_educational_unit_progress.entity';
import { CreateUserEducationalUnitProgressDto } from './dto/create-user_educational_unit_progress.dto';
import { UpdateUserEducationalUnitProgressDto } from './dto/update-user_educational_unit_progress.dto';

@Injectable()
export class UserEducationalUnitProgressService {
  constructor(
    @InjectRepository(UserEducationalUnitProgress)
    private readonly progressRepository: Repository<UserEducationalUnitProgress>,
  ) {}

  async create(
    createDto: CreateUserEducationalUnitProgressDto,
  ): Promise<UserEducationalUnitProgress> {
    const progress = this.progressRepository.create({
      ...createDto,
      user: { id: createDto.user_id } as any,
      unit: { id: createDto.unit_id } as any,
    });
    return await this.progressRepository.save(progress);
  }

  async findAll(): Promise<UserEducationalUnitProgress[]> {
    return await this.progressRepository.find({ relations: ['user', 'unit'] });
  }

  async findOne(id: string): Promise<UserEducationalUnitProgress> {
    const progress = await this.progressRepository.findOne({
      where: { id },
      relations: ['user', 'unit'],
    });
    if (!progress) throw new NotFoundException(`Progress #${id} not found`);
    return progress;
  }

  async update(
    id: string,
    updateDto: UpdateUserEducationalUnitProgressDto,
  ): Promise<UserEducationalUnitProgress> {
    const progress = await this.findOne(id);
    Object.assign(progress, updateDto);
    return await this.progressRepository.save(progress);
  }

  async remove(id: string): Promise<void> {
    const progress = await this.findOne(id);
    await this.progressRepository.remove(progress);
  }
}
