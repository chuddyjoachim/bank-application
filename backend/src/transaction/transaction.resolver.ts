import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/schema/user.schema';
import { createTransactionDto } from './dto/create-transaction.dto';
import { createTransactionInput } from './input/transactioninput';
import { TransactionService } from './transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @Query(() => String)
  transaction() {
    return 'transact';
  }

  @Query(() => [createTransactionDto])
  async allTransactions() {
    return this.transactionService.findAll()
  }

  @Mutation(() => createTransactionDto)
  async createTransaction(@Args('input') input: createTransactionInput) {
    return this.transactionService.createTransaction(input);
  }
  @Mutation(()=> [createTransactionDto])
  async getAllTransactionByUser(
    @Args("UserId") UserId: string,
  ){
    return this.transactionService.allTransactionsByUser(UserId)
  }

}
