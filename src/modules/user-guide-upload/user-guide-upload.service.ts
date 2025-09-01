import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGuideUpload } from './entities/user-guide-upload.entity';

import { UpdateUserGuideUploadDto } from './dto/update-user-guide-upload.dto';

@Injectable()
export class UserGuideUploadService {
  constructor(
    @InjectRepository(UserGuideUpload)
    private readonly uploadRepository: Repository<UserGuideUpload>,
  ) {}

  async create(
    createUserGuideUploadDto: Partial<UserGuideUpload>,
  ): Promise<UserGuideUpload> {
    const upload = this.uploadRepository.create(createUserGuideUploadDto);
    return await this.uploadRepository.save(upload);
  }

  async findAll(): Promise<UserGuideUpload[]> {
    return await this.uploadRepository.find();
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
}
