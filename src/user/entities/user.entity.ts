import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop({ select: false })
  password: string;

  @Prop({ select: false })
  confirm_password: string;

  @Prop()
  is_admin: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// eslint-disable-next-line @typescript-eslint/ban-types
UserSchema.pre<User>('save', async function (next: Function) {
  this.password = await hash(this.password, 10);
  next();
});
