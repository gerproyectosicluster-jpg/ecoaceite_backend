import { Injectable } from '@nestjs/common';
import { CreateEducationalModuleDto } from './dto/create-educational-module.dto';
import { UpdateEducationalModuleDto } from './dto/update-educational-module.dto';

@Injectable()
export class EducationalModulesService {
  create(createEducationalModuleDto: CreateEducationalModuleDto) {
    return 'This action adds a new educationalModule';
  }

  findAll() {
    return `This action returns all educationalModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} educationalModule`;
  }

  update(id: number, updateEducationalModuleDto: UpdateEducationalModuleDto) {
    return `This action updates a #${id} educationalModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} educationalModule`;
  }
}
