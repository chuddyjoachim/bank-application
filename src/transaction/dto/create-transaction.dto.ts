import { Field, Int, ObjectType } from "@nestjs/graphql"
import { TransactionType } from "../enum/transaction.enum"
import { tr } from "../input/transactioninput"

@ObjectType()
export class createTransactionDto{
    @Field(() => String)
    readonly _id: string

    @Field(() => String)
    readonly madeBy: string

    @Field(() => String)
    readonly type: string

    @Field(() => Int)
    readonly amount: number
}