import { Injectable } from '@nestjs/common';
import { CreateOilCollectionDto } from './dto/create-oil-collection.dto';
import { UpdateOilCollectionDto } from './dto/update-oil-collection.dto';

@Injectable()
export class OilCollectionsService {
  create(createOilCollectionDto: CreateOilCollectionDto) {
    return 'This action adds a new oilCollection';
  }

  findAll() {
    return `This action returns all oilCollections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oilCollection`;
  }

  update(id: number, updateOilCollectionDto: UpdateOilCollectionDto) {
    return `This action updates a #${id} oilCollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} oilCollection`;
  }
}
