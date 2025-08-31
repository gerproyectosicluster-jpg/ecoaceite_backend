import { Test, TestingModule } from '@nestjs/testing';
import { UserGuideUploadService } from './user-guide-upload.service';

describe('UserGuideUploadService', () => {
  let service: UserGuideUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGuideUploadService],
    }).compile();

    service = module.get<UserGuideUploadService>(UserGuideUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
