import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OilCollection } from './entities/oil-collection.entity';
import { CreateOilCollectionDto } from './dto/create-oil-collection.dto';
import { UpdateOilCollectionDto } from './dto/update-oil-collection.dto';

@Injectable()
export class OilCollectionsService {
  constructor(
    @InjectRepository(OilCollection)
    private readonly oilCollectionRepository: Repository<OilCollection>,
  ) {}

  async create(
    createOilCollectionDto: CreateOilCollectionDto,
  ): Promise<OilCollection> {
    const oilCollection = this.oilCollectionRepository.create({
      ...createOilCollectionDto,
      restaurant: { id: createOilCollectionDto.restaurant_id } as any,
      collector: createOilCollectionDto.collector_id
        ? ({ id: createOilCollectionDto.collector_id } as any)
        : undefined,
      collection_date: createOilCollectionDto.collection_date
        ? createOilCollectionDto.collection_date
        : undefined,
    });
    return await this.oilCollectionRepository.save(oilCollection);
  }

  async findAll(): Promise<OilCollection[]> {
    return await this.oilCollectionRepository.find({
      relations: ['restaurant', 'collector'],
    });
  }

  async findOne(id: string): Promise<OilCollection> {
    const oilCollection = await this.oilCollectionRepository.findOne({
      where: { id },
      relations: ['restaurant', 'collector'],
    });
    if (!oilCollection)
      throw new NotFoundException(`OilCollection #${id} not found`);
    return oilCollection;
  }

  async update(
    id: string,
    updateOilCollectionDto: UpdateOilCollectionDto,
  ): Promise<OilCollection> {
    const oilCollection = await this.findOne(id);
    Object.assign(oilCollection, updateOilCollectionDto);
    return await this.oilCollectionRepository.save(oilCollection);
  }

  async remove(id: string): Promise<void> {
    const oilCollection = await this.findOne(id);
    await this.oilCollectionRepository.remove(oilCollection);
  }
}
