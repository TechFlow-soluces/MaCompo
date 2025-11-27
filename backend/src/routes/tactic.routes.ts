import { Router } from 'express';
import {
  createTactic,
  getTactics,
  getTacticById,
  updateTactic,
  deleteTactic,
  createFormation,
} from '@controllers/tactic.controller';
import { simpleAuth } from '@middlewares/simple-auth';
import { validateBody } from '@middlewares/validation';
import { z } from 'zod';

const router = Router();

// All tactic routes require authentication
router.use(simpleAuth);

const createTacticSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

const updateTacticSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
});

const createFormationSchema = z.object({
  name: z.string().min(1).max(100),
  players: z.array(
    z.object({
      numero: z.number().int().min(1),
      nom: z.string().min(1),
      prenom: z.string().optional(),
      telephone: z.string().optional(),
      couleur: z.string(),
      positionX: z.number(),
      positionY: z.number(),
    })
  ),
});

router.post('/', validateBody(createTacticSchema), createTactic);
router.get('/', getTactics);
router.get('/:id', getTacticById);
router.put('/:id', validateBody(updateTacticSchema), updateTactic);
router.delete('/:id', deleteTactic);
router.post('/:tacticId/formations', validateBody(createFormationSchema), createFormation);

export default router;
