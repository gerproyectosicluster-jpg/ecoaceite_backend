import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EducationalModulesService } from './educational-modules.service';
import { CreateEducationalModuleDto } from './dto/create-educational-module.dto';
import { UpdateEducationalModuleDto } from './dto/update-educational-module.dto';

@Controller('educational-modules')
export class EducationalModulesController {
  constructor(
    private readonly educationalModulesService: EducationalModulesService,
  ) {}

  @Post()
  create(@Body() createEducationalModuleDto: CreateEducationalModuleDto) {
    return this.educationalModulesService.create(createEducationalModuleDto);
  }

  @Get()
  findAll() {
    return this.educationalModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationalModulesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationalModuleDto: UpdateEducationalModuleDto,
  ) {
    return this.educationalModulesService.update(
      id,
      updateEducationalModuleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationalModulesService.remove(id);
  }
}
