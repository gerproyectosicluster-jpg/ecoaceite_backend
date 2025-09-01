import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationalUnit } from './entities/educational-unit.entity';
import { CreateEducationalUnitDto } from './dto/create-educational-unit.dto';
import { UpdateEducationalUnitDto } from './dto/update-educational-unit.dto';

@Injectable()
export class EducationalUnitService {
  constructor(
    @InjectRepository(EducationalUnit)
    private readonly educationalUnitRepository: Repository<EducationalUnit>,
  ) {}

  async create(
    createEducationalUnitDto: CreateEducationalUnitDto,
  ): Promise<EducationalUnit> {
    const unit = this.educationalUnitRepository.create(
      createEducationalUnitDto,
    );
    return await this.educationalUnitRepository.save(unit);
  }

  async findAll(): Promise<EducationalUnit[]> {
    return await this.educationalUnitRepository.find();
  }

  async findOne(id: string): Promise<EducationalUnit> {
    const unit = await this.educationalUnitRepository.findOne({
      where: { id },
    });
    if (!unit) throw new NotFoundException(`EducationalUnit #${id} not found`);
    return unit;
  }

  async update(
    id: string,
    updateEducationalUnitDto: UpdateEducationalUnitDto,
  ): Promise<EducationalUnit> {
    const unit = await this.findOne(id);
    Object.assign(unit, updateEducationalUnitDto);
    return await this.educationalUnitRepository.save(unit);
  }

  async remove(id: string): Promise<void> {
    const unit = await this.findOne(id);
    await this.educationalUnitRepository.remove(unit);
  }
}
