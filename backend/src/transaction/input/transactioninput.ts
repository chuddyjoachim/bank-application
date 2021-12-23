import { Field, InputType, Int } from "@nestjs/graphql"
import { TransactionType } from "../enum/transaction.enum"

export const tr = ["deposit", "withdrawal", "transfer"] as const;

@InputType()
export class createTransactionInput{
    @Field()
    readonly madeBy: string

    @Field()
    readonly type: string

    @Field(() => Int)
    readonly amount: number
}