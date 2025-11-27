import { Request, Response, NextFunction } from 'express';
import { UserService } from '@services/user.service';
import { sendSuccess } from '@utils/response';

const userService = new UserService();

export const getUserOrCreate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username } = req.body;
    const user = await userService.getOrCreateUser(username);
    sendSuccess(res, { user }, 200);
  } catch (error) {
    next(error);
  }
};
