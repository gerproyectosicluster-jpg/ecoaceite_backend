import { Test, TestingModule } from '@nestjs/testing';
import { UserEducationalUnitProgressController } from './user_educational_unit_progress.controller';
import { UserEducationalUnitProgressService } from './user_educational_unit_progress.service';

describe('UserEducationalUnitProgressController', () => {
  let controller: UserEducationalUnitProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEducationalUnitProgressController],
      providers: [UserEducationalUnitProgressService],
    }).compile();

    controller = module.get<UserEducationalUnitProgressController>(
      UserEducationalUnitProgressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
