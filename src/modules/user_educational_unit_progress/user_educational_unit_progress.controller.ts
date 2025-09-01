import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserEducationalUnitProgressService } from './user_educational_unit_progress.service';
import { CreateUserEducationalUnitProgressDto } from './dto/create-user_educational_unit_progress.dto';
import { UpdateUserEducationalUnitProgressDto } from './dto/update-user_educational_unit_progress.dto';

@Controller('user-educational-unit-progress')
export class UserEducationalUnitProgressController {
  constructor(
    private readonly userEducationalUnitProgressService: UserEducationalUnitProgressService,
  ) {}

  @Post()
  create(
    @Body()
    createUserEducationalUnitProgressDto: CreateUserEducationalUnitProgressDto,
  ) {
    return this.userEducationalUnitProgressService.create(
      createUserEducationalUnitProgressDto,
    );
  }

  @Get()
  findAll() {
    return this.userEducationalUnitProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEducationalUnitProgressService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateUserEducationalUnitProgressDto: UpdateUserEducationalUnitProgressDto,
  ) {
    return this.userEducationalUnitProgressService.update(
      id,
      updateUserEducationalUnitProgressDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEducationalUnitProgressService.remove(id);
  }
}
