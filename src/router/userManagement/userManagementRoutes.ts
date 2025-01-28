import { NextFunction, Router } from 'express';
import type { Request, Response } from 'express';
import { addUser, getUserDetail, loginUser } from './userManagementcontroller';
import { validate } from '../../lib/validate';
import { addUserSchema, loginUserSchema } from './userManagementschema';
import { asyncHandler, authenticateToken } from 'src/lib/hepler';
import { successCodes } from 'src/lib/successConstant';

export const userRouter = Router();

userRouter.post(
  '/user',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    validate(req.body, addUserSchema);
    const data = await addUser(req.body);
    res.json(successCodes.SUCCESSFULL_SIGNUP);
  })
);

userRouter.post(
  '/login',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    validate(req.body, loginUserSchema);
    const data = await loginUser(req.body);
    res.set('Authorization', `Bearer ${data}`);
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.json(successCodes.SUCCESSFULL_LOGIN);
  })
);

userRouter.get(
  '/get-profile',
  asyncHandler(authenticateToken),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // const { email = '' } = req 
    const data = await getUserDetail('');
    data.password = '';
    res.status(200).json({ data });
  })
);
