import { Test, TestingModule } from '@nestjs/testing';
import { EducationalGuideController } from './educational-guide.controller';
import { EducationalGuideService } from './educational-guide.service';

describe('EducationalGuideController', () => {
  let controller: EducationalGuideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalGuideController],
      providers: [EducationalGuideService],
    }).compile();

    controller = module.get<EducationalGuideController>(
      EducationalGuideController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
