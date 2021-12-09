import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { TransactionType } from '../enum/transaction.enum';

export type TransactionDocument = Transaction & Document;

@Schema({_id: true})
export class Transaction {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  madeBy: string;

  @Prop()
  createdAt: Date;

  @Prop()
  type: string;

  @Prop()
  amount: number


}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
