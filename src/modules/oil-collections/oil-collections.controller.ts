import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OilCollectionsService } from './oil-collections.service';
import { CreateOilCollectionDto } from './dto/create-oil-collection.dto';
import { UpdateOilCollectionDto } from './dto/update-oil-collection.dto';

@Controller('oil-collections')
export class OilCollectionsController {
  constructor(private readonly oilCollectionsService: OilCollectionsService) {}

  @Post()
  create(@Body() createOilCollectionDto: CreateOilCollectionDto) {
    return this.oilCollectionsService.create(createOilCollectionDto);
  }

  @Get()
  findAll() {
    return this.oilCollectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oilCollectionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOilCollectionDto: UpdateOilCollectionDto,
  ) {
    return this.oilCollectionsService.update(+id, updateOilCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oilCollectionsService.remove(+id);
  }
}
