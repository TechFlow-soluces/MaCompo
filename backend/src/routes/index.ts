import { Router } from 'express';
import userRoutes from './user.routes';
import tacticRoutes from './tactic.routes';
import convocationRoutes from './convocation.routes';
import { config } from '@config/env';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: config.apiVersion,
  });
});

router.use('/users', userRoutes);
router.use('/tactics', tacticRoutes);
router.use('/convocations', convocationRoutes);

export default router;
