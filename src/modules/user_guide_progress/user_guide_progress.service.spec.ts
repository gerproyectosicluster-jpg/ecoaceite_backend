import { Test, TestingModule } from '@nestjs/testing';
import { UserGuideProgressService } from './user_guide_progress.service';

describe('UserGuideProgressService', () => {
  let service: UserGuideProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGuideProgressService],
    }).compile();

    service = module.get<UserGuideProgressService>(UserGuideProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
