import { Test, TestingModule } from '@nestjs/testing';
import { UserEducationalUnitProgressService } from './user_educational_unit_progress.service';

describe('UserEducationalUnitProgressService', () => {
  let service: UserEducationalUnitProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEducationalUnitProgressService],
    }).compile();

    service = module.get<UserEducationalUnitProgressService>(
      UserEducationalUnitProgressService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
