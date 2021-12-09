import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schema/transaction.schema';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Transaction.name, schema: TransactionSchema}])],
    providers: [TransactionResolver, TransactionService]
})


export class TransactionModule {}
