import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
// import { ConfigService } from '@nestjs/config'

export class Auth {
  async hashedPassword(plainPassword: string) {
    try {
      const password = await argon2.hash(plainPassword);
      return password;
    } catch (err) {
      //...
      return null;
    }
  }

  async verifyPassword(hashedPassword: string, plainPassword: string) {
    return await argon2.verify(hashedPassword, plainPassword);
  }

  //   create access token
  async createAccessToken(userId: string) {
    return await jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
  }

  // verify access token
  async verifyAccessToken(token: string){
    return await jwt.verify(token, process.env.JWT_SECRET!);
  }

  // create refresh token
  async createRefreshToken(userId: string) {
    return await jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN, {
      expiresIn: '7d',
    });
  }
}
