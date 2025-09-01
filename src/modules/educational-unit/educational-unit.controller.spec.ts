import { Test, TestingModule } from '@nestjs/testing';
import { EducationalUnitController } from './educational-unit.controller';
import { EducationalUnitService } from './educational-unit.service';

describe('EducationalUnitController', () => {
  let controller: EducationalUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalUnitController],
      providers: [EducationalUnitService],
    }).compile();

    controller = module.get<EducationalUnitController>(
      EducationalUnitController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
