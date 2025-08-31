import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserGuideUploadService } from './user-guide-upload.service';
import { CreateUserGuideUploadDto } from './dto/create-user-guide-upload.dto';
import { UpdateUserGuideUploadDto } from './dto/update-user-guide-upload.dto';

@Controller('user-guide-upload')
export class UserGuideUploadController {
  constructor(
    private readonly userGuideUploadService: UserGuideUploadService,
  ) {}

  @Post()
  create(@Body() createUserGuideUploadDto: CreateUserGuideUploadDto) {
    return this.userGuideUploadService.create(createUserGuideUploadDto);
  }

  @Get()
  findAll() {
    return this.userGuideUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGuideUploadService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserGuideUploadDto: UpdateUserGuideUploadDto,
  ) {
    return this.userGuideUploadService.update(id, updateUserGuideUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGuideUploadService.remove(id);
  }
}
