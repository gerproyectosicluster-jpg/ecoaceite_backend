import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGuideUpload } from './entities/user-guide-upload.entity';
import { GuideStatus } from './enum/guide_status.enum';
import { UserEducationalUnitProgress } from '../user_educational_unit_progress/entities/user_educational_unit_progress.entity';
import { EducationalGuide } from '../educational-guide/entities/educational-guide.entity';
import { EducationalUnit } from '../educational-unit/entities/educational-unit.entity';

import { UpdateUserGuideUploadDto } from './dto/update-user-guide-upload.dto';

@Injectable()
export class UserGuideUploadService {
  constructor(
    @InjectRepository(UserGuideUpload)
    private readonly uploadRepository: Repository<UserGuideUpload>,
    @InjectRepository(UserEducationalUnitProgress)
    private readonly progressRepository: Repository<UserEducationalUnitProgress>,
    @InjectRepository(EducationalGuide)
    private readonly guideRepository: Repository<EducationalGuide>,
    @InjectRepository(EducationalUnit)
    private readonly unitRepository: Repository<EducationalUnit>,
  ) {}

  async create(
    createUserGuideUploadDto: Partial<UserGuideUpload>,
  ): Promise<UserGuideUpload> {
    const upload = this.uploadRepository.create(createUserGuideUploadDto);
    return await this.uploadRepository.save(upload);
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    data: UserGuideUpload[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    const [data, total] = await this.uploadRepository.findAndCount({
      relations: ['user', 'guide', 'guide.unit'],
      order: { user: { name: 'ASC' } },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<UserGuideUpload> {
    const upload = await this.uploadRepository.findOne({ where: { id } });
    if (!upload)
      throw new NotFoundException(`UserGuideUpload #${id} not found`);
    return upload;
  }

  async findByUserId(userId: string): Promise<UserGuideUpload[]> {
    return await this.uploadRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'guide'],
    });
  }

  async update(
    id: string,
    updateUserGuideUploadDto: UpdateUserGuideUploadDto,
  ): Promise<UserGuideUpload> {
    const upload = await this.findOne(id);
    Object.assign(upload, updateUserGuideUploadDto);
    return await this.uploadRepository.save(upload);
  }

  async remove(id: string): Promise<void> {
    const upload = await this.findOne(id);
    await this.uploadRepository.remove(upload);
  }

  async approveUploadAndUpdateProgress(uploadId: string): Promise<any> {
    // 1. Buscar el upload y cambiar estado
    const upload = await this.uploadRepository.findOne({
      where: { id: uploadId },
      relations: ['user', 'guide', 'guide.unit'],
    });
    if (!upload) throw new NotFoundException('UserGuideUpload not found');
    upload.status = GuideStatus.APPROVED;
    await this.uploadRepository.save(upload);

    // 2. Obtener unidad y usuario
    const user = upload.user;
    const guide = upload.guide;
    const unit = guide.unit;
    if (!unit) throw new NotFoundException('Unit not found for guide');

    // 3. Buscar o crear progreso
    let progress = await this.progressRepository.findOne({
      where: { user: { id: user.id }, unit: { id: unit.id } },
      relations: ['user', 'unit'],
    });

    if (!progress) {
      progress = this.progressRepository.create({
        user,
        unit,
        progress: 1,
        total_score: guide.guide_score || 0,
        completed: unit.resources ? 1 === unit.resources : false, // completed true si es el último recurso
      });
    } else {
      progress.progress += 1;
      progress.total_score += guide.guide_score || 0;
      progress.completed = unit.resources
        ? progress.progress === unit.resources
        : false;
    }
    await this.progressRepository.save(progress);

    return { success: true };
  }

  async rejectUpload(uploadId: string): Promise<UserGuideUpload> {
    const upload = await this.uploadRepository.findOne({
      where: { id: uploadId },
    });
    if (!upload) throw new NotFoundException('UserGuideUpload not found');
    upload.status = GuideStatus.REJECTED;
    return await this.uploadRepository.save(upload);
  }
}
