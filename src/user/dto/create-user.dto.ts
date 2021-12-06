import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreateUserDto {    
    @Field(() => String)
    readonly _id: string;

    @Field(() => String)
    readonly name: string;

    @Field(()=> String)
    readonly email: string;
  }