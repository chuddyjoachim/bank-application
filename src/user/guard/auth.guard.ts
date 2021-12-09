import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Auth } from 'src/auth/auth';

const authHelper = new Auth();

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req: Request & { payload: string | JwtPayload } = ctx.getContext().req

    const auhtorization = req.headers['authorization'];

    if (!auhtorization) {
      throw new Error('not authenticated');
    }
  
    try {
      const token = auhtorization?.split(' ')[1];
  
      const payload = await authHelper.verifyAccessToken(token);
  
      if (!payload) {
        throw new Error('not authenticated');
      }

      req.payload! = payload

    } catch (err) {
      throw new Error('not authenticated');
    }





    return true;
  }
}