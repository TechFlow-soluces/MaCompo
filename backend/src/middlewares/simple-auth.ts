import { Response, NextFunction, Request } from 'express';
import { AuthenticatedRequest, AppError } from '@types/index';
import { UserService } from '@services/user.service';

const userService = new UserService();

export const simpleAuth = async (req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get username from header
    const username = req.headers['x-username'] as string;

    if (!username) {
      throw new AppError(401, 'Username required in X-Username header', 'MISSING_USERNAME');
    }

    // Get or create user
    const user = await userService.getOrCreateUser(username);

    // Attach user to request
    req.user = {
      userId: user.id,
      email: username,
      role: 'USER' as const,
    };

    next();
  } catch (error) {
    next(error);
  }
};
