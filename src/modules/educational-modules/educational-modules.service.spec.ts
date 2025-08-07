import { Test, TestingModule } from '@nestjs/testing';
import { EducationalModulesService } from './educational-modules.service';

describe('EducationalModulesService', () => {
  let service: EducationalModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalModulesService],
    }).compile();

    service = module.get<EducationalModulesService>(EducationalModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
