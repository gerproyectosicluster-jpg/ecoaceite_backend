import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EducationalUnitService } from './educational-unit.service';
import { CreateEducationalUnitDto } from './dto/create-educational-unit.dto';
import { UpdateEducationalUnitDto } from './dto/update-educational-unit.dto';

@Controller('educational-unit')
export class EducationalUnitController {
  constructor(
    private readonly educationalUnitService: EducationalUnitService,
  ) {}

  @Post()
  create(@Body() createEducationalUnitDto: CreateEducationalUnitDto) {
    return this.educationalUnitService.create(createEducationalUnitDto);
  }

  @Get()
  findAll() {
    return this.educationalUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationalUnitService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationalUnitDto: UpdateEducationalUnitDto,
  ) {
    return this.educationalUnitService.update(id, updateEducationalUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationalUnitService.remove(id);
  }
}
