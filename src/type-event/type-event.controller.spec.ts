import { Test, TestingModule } from '@nestjs/testing';
import { TypeEventController } from './type-event.controller';
import { TypeEventService } from './type-event.service';

describe('TypeEventController', () => {
  let controller: TypeEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeEventController],
      providers: [TypeEventService],
    }).compile();

    controller = module.get<TypeEventController>(TypeEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
