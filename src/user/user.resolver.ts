import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInput } from './input/userinput';
import { User } from './user.schema';
import { UserService } from './user.service';


@Resolver()
export class UserResolver {
    constructor(private userService: UserService){}

    // @Query(returns => [User])
    // users(): Promise<User[]>{
    //   return this.userService.findAll()
    // }
    @Query(() => String)
    hello(){
      return 'hello'
    }

    @Query(() => [CreateUserDto])
    async allUser(): Promise<User[]>{
      return this.userService.findAll()
    }

    @Mutation(() => CreateUserDto)
    async createUser(@Args('input') input: UserInput) {
      return this.userService.create(input);
    }

  }