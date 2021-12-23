import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ErrorField {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class CreateUserDto {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => String, { nullable: true })
  readonly _id: string;

  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => String, { nullable: true })
  readonly email: string;

  @Field(() => String, { nullable: true })
  readonly phoneNumber?: string;

  @Field(() => String, { nullable: true })
  readonly accountNumber?: string;

  @Field(() => String, { nullable: true })
  readonly accessToken?: string;
}
