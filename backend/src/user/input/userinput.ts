import { Field, InputType, Int, Float } from "@nestjs/graphql";

@InputType()
export class UserInput {
    @Field()
    readonly name: string;
    @Field()
    readonly email: string;
    @Field()
    readonly password: string;
    @Field()
    readonly phoneNumber: string;
    @Field(() => Int, {nullable : true})
    readonly accountNumber?: string;

  }