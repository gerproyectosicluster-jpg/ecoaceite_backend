import { Test, TestingModule } from '@nestjs/testing';
import { UserGuideUploadController } from './user-guide-upload.controller';
import { UserGuideUploadService } from './user-guide-upload.service';

describe('UserGuideUploadController', () => {
  let controller: UserGuideUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGuideUploadController],
      providers: [UserGuideUploadService],
    }).compile();

    controller = module.get<UserGuideUploadController>(
      UserGuideUploadController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
