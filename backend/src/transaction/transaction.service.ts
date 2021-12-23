import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { createTransactionInput } from './input/transactioninput';
import { Transaction, TransactionDocument } from './schema/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async createTransaction(
    createTransaction: createTransactionInput,
  ): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(createTransaction);
    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async allTransactionsByUser(
    userId: string
  ){
    return this.transactionModel.find({madeBy: userId})

  }
}
