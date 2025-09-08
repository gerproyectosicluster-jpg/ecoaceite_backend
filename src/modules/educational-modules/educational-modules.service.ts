import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationalModule } from './entities/educational-module.entity';
import { CreateEducationalModuleDto } from './dto/create-educational-module.dto';
import { UpdateEducationalModuleDto } from './dto/update-educational-module.dto';

@Injectable()
export class EducationalModulesService {
  constructor(
    @InjectRepository(EducationalModule)
    private readonly educationalModuleRepository: Repository<EducationalModule>,
  ) {}

  async create(
    createEducationalModuleDto: CreateEducationalModuleDto,
  ): Promise<EducationalModule> {
    const module = this.educationalModuleRepository.create(
      createEducationalModuleDto,
    );
    return await this.educationalModuleRepository.save(module);
  }

  async findAll(): Promise<EducationalModule[]> {
    return await this.educationalModuleRepository.find({
      order: { title: 'DESC' },
    });
  }

  async findOne(id: string): Promise<EducationalModule> {
    const module = await this.educationalModuleRepository.findOne({
      where: { id },
    });
    if (!module)
      throw new NotFoundException(`EducationalModule #${id} not found`);
    return module;
  }

  async update(
    id: string,
    updateEducationalModuleDto: UpdateEducationalModuleDto,
  ): Promise<EducationalModule> {
    const module = await this.findOne(id);
    Object.assign(module, updateEducationalModuleDto);
    return await this.educationalModuleRepository.save(module);
  }

  async remove(id: string): Promise<void> {
    const module = await this.findOne(id);
    await this.educationalModuleRepository.remove(module);
  }
}
