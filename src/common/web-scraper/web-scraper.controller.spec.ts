import { Test, TestingModule } from '@nestjs/testing';
import { WebScraperController } from './web-scraper.controller';

describe('WebScraper Controller', () => {
  let controller: WebScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebScraperController],
    }).compile();

    controller = module.get<WebScraperController>(WebScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
