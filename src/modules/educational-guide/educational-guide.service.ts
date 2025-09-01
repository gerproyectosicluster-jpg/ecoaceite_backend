import { Injectable, NotFoundException } from '@nestjs/common';
import { EducationalUnit } from '../educational-unit/entities/educational-unit.entity';
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
    @InjectRepository(EducationalUnit)
    private readonly unitRepository: Repository<EducationalUnit>,
  ) {}

  async create(
    createEducationalGuideDto: CreateEducationalGuideDto,
  ): Promise<EducationalGuide> {
    const unit = await this.unitRepository.findOne({
      where: { id: createEducationalGuideDto.unit_id },
    });
    if (!unit) throw new NotFoundException('EducationalUnit not found');
    const guide = this.guideRepository.create({
      ...createEducationalGuideDto,
      unit,
    });
    return await this.guideRepository.save(guide);
  }

  async findAll(): Promise<any[]> {
    const guides = await this.guideRepository.find({ relations: ['unit'] });
    return guides.map((guide) => ({
      ...guide,
      unit_id: guide.unit?.id,
    }));
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
