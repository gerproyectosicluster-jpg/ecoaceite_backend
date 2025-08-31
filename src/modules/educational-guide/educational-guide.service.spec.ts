import { Test, TestingModule } from '@nestjs/testing';
import { EducationalGuideService } from './educational-guide.service';

describe('EducationalGuideService', () => {
  let service: EducationalGuideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalGuideService],
    }).compile();

    service = module.get<EducationalGuideService>(EducationalGuideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
