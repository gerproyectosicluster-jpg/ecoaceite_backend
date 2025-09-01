import { Test, TestingModule } from '@nestjs/testing';
import { UserGuideProgressController } from './user_guide_progress.controller';
import { UserGuideProgressService } from './user_guide_progress.service';

describe('UserGuideProgressController', () => {
  let controller: UserGuideProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGuideProgressController],
      providers: [UserGuideProgressService],
    }).compile();

    controller = module.get<UserGuideProgressController>(
      UserGuideProgressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
