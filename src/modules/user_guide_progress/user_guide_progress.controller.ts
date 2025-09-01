import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserGuideProgressService } from './user_guide_progress.service';
import { CreateUserGuideProgressDto } from './dto/create-user_guide_progress.dto';
import { UpdateUserGuideProgressDto } from './dto/update-user_guide_progress.dto';

@Controller('user-guide-progress')
export class UserGuideProgressController {
  constructor(
    private readonly userGuideProgressService: UserGuideProgressService,
  ) {}

  @Post()
  create(@Body() createUserGuideProgressDto: CreateUserGuideProgressDto) {
    return this.userGuideProgressService.create(createUserGuideProgressDto);
  }

  @Get()
  findAll() {
    return this.userGuideProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGuideProgressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserGuideProgressDto: UpdateUserGuideProgressDto,
  ) {
    return this.userGuideProgressService.update(
      +id,
      updateUserGuideProgressDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGuideProgressService.remove(+id);
  }
}
