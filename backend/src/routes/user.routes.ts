import { Router } from 'express';
import { getUserOrCreate } from '@controllers/user.controller';
import { validateBody } from '@middlewares/validation';
import { z } from 'zod';

const router = Router();

const getUserOrCreateSchema = z.object({
  username: z.string().min(1).max(50),
});

router.post('/', validateBody(getUserOrCreateSchema), getUserOrCreate);

export default router;
