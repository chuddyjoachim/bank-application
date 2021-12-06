import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInput } from './input/userinput';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(CreateUserDto: UserInput): Promise<User> {
    const createdUser = new this.userModel(CreateUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}




/* import { Injectable } from '@nestjs/common';
import { UserSchema } from './user.schema';

@Injectable()
export class UserService {
    async findAll(): Promise<User[]>{
        const user = new User()

        user.name = "ncien";
        user.email = "Mar@jojo.com";

        return [user]
    }
} */
