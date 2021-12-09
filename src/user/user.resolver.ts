import { Logger, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CookieOptions } from 'express';
import { Auth } from 'src/auth/auth';
import { PROD } from 'src/constant';
import Ctx from 'src/types/context.types';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { LoginInput } from './input/logininput';
import { UserInput } from './input/userinput';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

const authHelper = new Auth();

const cookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 60, // * 24 * 7 * 12
  httpOnly: true,
  sameSite: 'lax',
  secure: PROD,
};

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Query(() => String)
  @UseGuards(AuthGuard)
  bye(@Context() { req}: Ctx) {
    const payload = req.payload
    Logger.log(payload);

    return `your userId is ${payload.userId}`;
  }

  @Query(() => [CreateUserDto])
  async allUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  /* register mutatin */
  @Mutation(() => CreateUserDto)
  async createUser(@Args('input') input: UserInput) {
    // check if user email is taken
    const isEmailTaken = await this.userService.findByEmail(input.email);
    // console.log({ user: isEmailTaken });

    // hash paword
    const passwordHash = await authHelper.hashedPassword(input.password);

    if (!isEmailTaken) {
      const newUser: User = await this.userService.create({
        ...input,
        password: passwordHash,
        accountNumber: input.phoneNumber,
      });

      /* do login stuff */
      const loginUser = await this.userService.findByEmail(newUser.email);
      return {
        accessToken: authHelper.createAccessToken(loginUser._id),
        _id: loginUser._id,
        email: loginUser.email,
      };
    }
    return {
      errors: [
        {
          field: 'user email',
          message: 'User with email already exist',
        },
      ],
    };
  }

  /* login mutation */
  @Mutation(() => CreateUserDto)
  async loginUser(
    @Args('input') input: LoginInput,
    @Context() { req, res }: Ctx,
  ) {
    const isUserEmailValid = await this.userService.findByEmail(input.email);
    console.log(isUserEmailValid);

    if (!isUserEmailValid) {
      return {
        errors: [
          {
            field: 'user email',
            message: 'User with email does not exist',
          },
        ],
      };
    }

    if (isUserEmailValid) {
      // verify user password
      const verrifiedPassword = await authHelper.verifyPassword(
        isUserEmailValid.password,
        input.password,
      );

      if (!verrifiedPassword) {
        return {
          errors: [
            {
              field: 'user password',
              message: 'invalid password',
            },
          ],
        };
      }

      if (verrifiedPassword) {
        /* do login stuff */
        // context.
        res.cookie(
          'mif',
          await authHelper.createRefreshToken(isUserEmailValid._id),
          cookieOptions,
        );
        return {
          accessToken: authHelper.createAccessToken(isUserEmailValid._id),
          _id: isUserEmailValid._id,
          email: isUserEmailValid.email,
        };
      }
    }
    return {
      errors: [
        {
          field: 'user email',
          message: 'User with email already exist',
        },
      ],
    };
  }
}
