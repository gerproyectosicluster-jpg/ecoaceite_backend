import { Test, TestingModule } from '@nestjs/testing';
import { OilCollectionsController } from './oil-collections.controller';
import { OilCollectionsService } from './oil-collections.service';

describe('OilCollectionsController', () => {
  let controller: OilCollectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OilCollectionsController],
      providers: [OilCollectionsService],
    }).compile();

    controller = module.get<OilCollectionsController>(OilCollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
