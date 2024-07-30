import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop()
  event_id: string;

  @Prop()
  user_id: string;

  @Prop()
  username: string;

  @Prop()
  contact: string;

  @Prop()
  eventName: string;

  @Prop()
  quantity: number;

  @Prop()
  eventDate: Date;

  @Prop()
  bookingDate: Date;

  @Prop()
  place: string;

  @Prop()
  total: number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
