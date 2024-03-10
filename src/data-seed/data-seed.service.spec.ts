import { Test, TestingModule } from '@nestjs/testing';
import { DataSeedService } from './data-seed.service';

describe('DataSeedService', () => {
  let service: DataSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSeedService],
    }).compile();

    service = module.get<DataSeedService>(DataSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
