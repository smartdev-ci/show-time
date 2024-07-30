import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hash } from 'bcrypt';
import { NextFunction } from 'express';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ select: false })
  password: string;

  @Prop({ select: false })
  confirm_password: string;

  @Prop()
  is_admin: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<User>('save', async function (next: NextFunction) {
  this.password = await hash(this.password, 10);
  next();
});
