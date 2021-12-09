import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({_id: true})
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({default : 0})
  balance: number;

  @Prop()
  phoneNumber: number;

  @Prop()
  accountNumber: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
