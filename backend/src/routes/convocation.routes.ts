import { Router } from 'express';
import { sendConvocations, previewConvocation } from '@controllers/convocation.controller';
import { simpleAuth } from '@middlewares/simple-auth';
import { validateBody } from '@middlewares/validation';
import { z } from 'zod';

const router = Router();

router.use(simpleAuth);

const convocationSchema = z.object({
  matchDate: z.string().min(1),
  matchTime: z.string().min(1),
  location: z.string().min(1),
  opponent: z.string().optional(),
});

router.post('/formations/:formationId/send', validateBody(convocationSchema), sendConvocations);
router.post('/formations/:formationId/preview', validateBody(convocationSchema), previewConvocation);

export default router;
