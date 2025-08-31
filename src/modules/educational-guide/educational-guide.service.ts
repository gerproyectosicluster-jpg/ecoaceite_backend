import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationalGuide } from './entities/educational-guide.entity';
import { CreateEducationalGuideDto } from './dto/create-educational-guide.dto';
import { UpdateEducationalGuideDto } from './dto/update-educational-guide.dto';

@Injectable()
export class EducationalGuideService {
  constructor(
    @InjectRepository(EducationalGuide)
    private readonly guideRepository: Repository<EducationalGuide>,
  ) {}

  async create(
    createEducationalGuideDto: CreateEducationalGuideDto,
  ): Promise<EducationalGuide> {
    const guide = this.guideRepository.create(createEducationalGuideDto);
    return await this.guideRepository.save(guide);
  }

  async findAll(): Promise<EducationalGuide[]> {
    return await this.guideRepository.find();
  }

  async findOne(id: string): Promise<EducationalGuide> {
    const guide = await this.guideRepository.findOne({ where: { id } });
    if (!guide)
      throw new NotFoundException(`EducationalGuide #${id} not found`);
    return guide;
  }

  async update(
    id: string,
    updateEducationalGuideDto: UpdateEducationalGuideDto,
  ): Promise<EducationalGuide> {
    const guide = await this.findOne(id);
    Object.assign(guide, updateEducationalGuideDto);
    return await this.guideRepository.save(guide);
  }

  async remove(id: string): Promise<void> {
    const guide = await this.findOne(id);
    await this.guideRepository.remove(guide);
  }
}
