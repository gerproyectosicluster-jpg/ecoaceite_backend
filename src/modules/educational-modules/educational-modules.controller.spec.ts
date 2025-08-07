import { Test, TestingModule } from '@nestjs/testing';
import { EducationalModulesController } from './educational-modules.controller';
import { EducationalModulesService } from './educational-modules.service';

describe('EducationalModulesController', () => {
  let controller: EducationalModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalModulesController],
      providers: [EducationalModulesService],
    }).compile();

    controller = module.get<EducationalModulesController>(
      EducationalModulesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
