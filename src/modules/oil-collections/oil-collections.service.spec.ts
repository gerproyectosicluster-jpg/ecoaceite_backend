import { Test, TestingModule } from '@nestjs/testing';
import { OilCollectionsService } from './oil-collections.service';

describe('OilCollectionsService', () => {
  let service: OilCollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OilCollectionsService],
    }).compile();

    service = module.get<OilCollectionsService>(OilCollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
