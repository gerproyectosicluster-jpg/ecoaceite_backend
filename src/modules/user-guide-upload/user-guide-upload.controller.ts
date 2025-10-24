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
  Query,
  UseFilters,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuideUploadService } from './user-guide-upload.service';
import { CreateUserGuideUploadDto } from './dto/create-user-guide-upload.dto';
import { UpdateUserGuideUploadDto } from './dto/update-user-guide-upload.dto';
import { S3Service } from 'src/util/services/s3.service';
import { UserService } from '../user/user.service';
import { EducationalGuideService } from '../educational-guide/educational-guide.service';
import { GuideStatus } from './enum/guide_status.enum';
import { MulterExceptionFilter } from './multer-exception-filter';

@UseFilters(MulterExceptionFilter)
@Controller('user-guide-upload')
export class UserGuideUploadController {
  constructor(
    private readonly userGuideUploadService: UserGuideUploadService,
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
    private readonly educationalGuideService: EducationalGuideService,
  ) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB en bytes
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserGuideUploadDto,
  ) {
    const guide = await this.educationalGuideService.findOne(body.guide_id);
    const unit = guide.unit;
    if (!unit) throw new Error('EducationalUnit not found for this guide');
    const user = await this.userService.findOne(body.user_id);

    // Buscar si ya existe un upload para este user y guide
    const existingUpload = await this.userGuideUploadService.findByUserAndGuide(
      body.user_id,
      body.guide_id,
    );

    // Si existe, eliminar el archivo anterior de S3
    if (existingUpload && existingUpload.upload_url) {
      await this.s3Service.deleteFile(existingUpload.upload_url);
    }

    // Subir el nuevo archivo
    const uploadUrl = await this.s3Service.uploadFile(
      file,
      guide.title,
      user.restaurant_name,
      unit.slug,
    );

    if (existingUpload) {
      // Actualizar el registro existente
      existingUpload.upload_url = uploadUrl;
      existingUpload.status = GuideStatus.PENDING_APPROVAL;
      return this.userGuideUploadService.update(
        existingUpload.id,
        existingUpload,
      );
    } else {
      // Crear nuevo registro
      return this.userGuideUploadService.create({
        guide,
        user,
        upload_url: uploadUrl,
        status: GuideStatus.PENDING_APPROVAL,
      });
    }
  }

  @Post()
  create(@Body() createUserGuideUploadDto: CreateUserGuideUploadDto) {
    return this.userGuideUploadService.create(createUserGuideUploadDto);
  }

  @Patch('approve/:id')
  async approveUpload(@Param('id') id: string) {
    return this.userGuideUploadService.approveUploadAndUpdateProgress(id);
  }

  @Patch('reject/:id')
  async rejectUpload(@Param('id') id: string) {
    return this.userGuideUploadService.rejectUpload(id);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.userGuideUploadService.findAll(Number(page), Number(limit));
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
