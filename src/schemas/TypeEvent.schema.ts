// src/schemas/type-event4.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TypeEventDocument = TypeEvent & Document;

@Schema()
export class TypeEvent {
  @Prop()
  name: string;
}

export const TypeEventSchema = SchemaFactory.createForClass(TypeEvent);
