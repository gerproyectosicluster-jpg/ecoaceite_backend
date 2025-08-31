import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EducationalGuideService } from './educational-guide.service';
import { CreateEducationalGuideDto } from './dto/create-educational-guide.dto';
import { UpdateEducationalGuideDto } from './dto/update-educational-guide.dto';

@Controller('educational-guide')
export class EducationalGuideController {
  constructor(
    private readonly educationalGuideService: EducationalGuideService,
  ) {}

  @Post()
  create(@Body() createEducationalGuideDto: CreateEducationalGuideDto) {
    return this.educationalGuideService.create(createEducationalGuideDto);
  }

  @Get()
  findAll() {
    return this.educationalGuideService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationalGuideService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationalGuideDto: UpdateEducationalGuideDto,
  ) {
    return this.educationalGuideService.update(id, updateEducationalGuideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationalGuideService.remove(id);
  }
}
