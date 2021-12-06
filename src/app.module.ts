import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction/transaction.service';
import { TransactionResolver } from './transaction/transaction.resolver';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService, TransactionService, TransactionResolver],
})
export class AppModule {}

// 'mongodb://localhost/nestbank'
