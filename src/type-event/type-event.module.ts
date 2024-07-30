import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeEvent, TypeEventSchema } from 'src/schemas/TypeEvent.schema';
import { TypeEventService } from './type-event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TypeEvent.name, schema: TypeEventSchema },
    ]),
  ],
  providers: [TypeEventService],
  exports: [TypeEventService],
})
export class TypeEventModule {}
