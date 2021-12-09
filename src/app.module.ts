import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';
import Ctx from './types/context.types';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }): Ctx => ({ req, res }),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 'mongodb://localhost/nestbank'
