import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface requestInt extends JwtPayload{
  userId: string
}

type Ctx = {
  req: Request & { payload: requestInt };
  res: Response;
  payload?: { userId: string };
};

export default Ctx;
