import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@types/index';
import { TacticService } from '@services/tactic.service';
import { sendSuccess } from '@utils/response';

const tacticService = new TacticService();

export const createTactic = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = req.user!.userId;

    const tactic = await tacticService.createTactic({
      name,
      description,
      userId,
    });

    sendSuccess(res, { tactic }, 201);
  } catch (error) {
    next(error);
  }
};

export const getTactics = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const tactics = await tacticService.getTactics(userId);
    sendSuccess(res, { tactics });
  } catch (error) {
    next(error);
  }
};

export const getTacticById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const tactic = await tacticService.getTacticById(id, userId);
    sendSuccess(res, { tactic });
  } catch (error) {
    next(error);
  }
};

export const updateTactic = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user!.userId;

    const tactic = await tacticService.updateTactic(id, userId, {
      name,
      description,
    });

    sendSuccess(res, { tactic });
  } catch (error) {
    next(error);
  }
};

export const deleteTactic = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    await tacticService.deleteTactic(id, userId);
    sendSuccess(res, { message: 'Tactic deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const createFormation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tacticId } = req.params;
    const { name, players } = req.body;

    const formation = await tacticService.createFormation({
      name,
      tacticId,
      players,
    });

    sendSuccess(res, { formation }, 201);
  } catch (error) {
    next(error);
  }
};
