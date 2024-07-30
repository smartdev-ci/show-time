import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  event_name: string;

  @Prop()
  description: string;

  @Prop()
  place: string;

  @Prop()
  date_due: string;

  @Prop()
  cost: number;

  @Prop()
  type_event_id: string;

  @Prop()
  image: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
