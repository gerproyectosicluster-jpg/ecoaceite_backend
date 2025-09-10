import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuideUploadService } from './user-guide-upload.service';
import { CreateUserGuideUploadDto } from './dto/create-user-guide-upload.dto';
import { UpdateUserGuideUploadDto } from './dto/update-user-guide-upload.dto';
import { S3Service } from 'src/util/services/s3.service';
import { UserService } from '../user/user.service';
import { EducationalGuideService } from '../educational-guide/educational-guide.service';
import { GuideStatus } from './enum/guide_status.enum';

@Controller('user-guide-upload')
export class UserGuideUploadController {
  constructor(
    private readonly userGuideUploadService: UserGuideUploadService,
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
    private readonly educationalGuideService: EducationalGuideService,
  ) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserGuideUploadDto,
  ) {
    const guide = await this.educationalGuideService.findOne(body.guide_id);

    // Asegúrate de cargar la relación 'unit' al buscar la guía
    const unit = guide.unit;
    if (!unit) throw new Error('EducationalUnit not found for this guide');

    const user = await this.userService.findOne(body.user_id);

    const uploadUrl = await this.s3Service.uploadFile(
      file,
      guide.title,
      user.restaurant_name,
      unit.slug,
    );

    return this.userGuideUploadService.create({
      guide,
      user,
      upload_url: uploadUrl,
      status: GuideStatus.PENDING_APPROVAL,
    });
  }

  @Post()
  create(@Body() createUserGuideUploadDto: CreateUserGuideUploadDto) {
    return this.userGuideUploadService.create(createUserGuideUploadDto);
  }

  @Patch('approve/:id')
  async approveUpload(@Param('id') id: string) {
    return this.userGuideUploadService.approveUploadAndUpdateProgress(id);
  }

  @Get()
  findAll() {
    return this.userGuideUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGuideUploadService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.userGuideUploadService.findByUserId(userId);
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
