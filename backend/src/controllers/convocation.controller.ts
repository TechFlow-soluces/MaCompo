import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@types/index';
import { TacticService } from '@services/tactic.service';
import { SmsService } from '@services/sms.service';
import { sendSuccess } from '@utils/response';

const tacticService = new TacticService();
const smsService = new SmsService();

export const sendConvocations = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { formationId } = req.params;
    const { matchDate, matchTime, location, opponent } = req.body;

    // Get all players from the formation
    const players = await tacticService.getPlayersForConvocation(formationId);

    // Transform to SMS format
    const playerContacts = players.map((p) => ({
      nom: p.nom,
      prenom: p.prenom || undefined,
      telephone: p.telephone || '',
    }));

    // Send SMS convocations
    const result = await smsService.sendConvocation(playerContacts, {
      matchDate,
      matchTime,
      location,
      opponent,
    });

    sendSuccess(res, {
      message: 'Convocations sent',
      summary: {
        total: players.length,
        sent: result.sent,
        failed: result.failed,
      },
      details: result.details,
    });
  } catch (error) {
    next(error);
  }
};

export const previewConvocation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { formationId } = req.params;
    const { matchDate, matchTime, location, opponent } = req.body;

    // Get all players from the formation
    const players = await tacticService.getPlayersForConvocation(formationId);

    // Transform to SMS format
    const playerContacts = players.map((p) => ({
      nom: p.nom,
      prenom: p.prenom || undefined,
      telephone: p.telephone || '',
    }));

    // Generate preview messages
    const previews = smsService.generatePreview(playerContacts, {
      matchDate,
      matchTime,
      location,
      opponent,
    });

    sendSuccess(res, {
      players: players.map((p, i) => ({
        nom: p.nom,
        prenom: p.prenom,
        telephone: p.telephone,
        message: previews[i],
      })),
    });
  } catch (error) {
    next(error);
  }
};
