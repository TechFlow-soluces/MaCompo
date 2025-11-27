import twilio from 'twilio';
import { config } from '@config/env';
import { logger } from '@utils/logger';
import { AppError } from '@types/index';

interface ConvocationData {
  matchDate: string;
  matchTime: string;
  location: string;
  opponent?: string;
}

interface PlayerContact {
  nom: string;
  prenom?: string;
  telephone: string;
}

export class SmsService {
  private client: twilio.Twilio | null = null;

  constructor() {
    if (config.sms.enabled) {
      if (!config.sms.accountSid || !config.sms.authToken || !config.sms.phoneNumber) {
        throw new AppError(500, 'SMS service is enabled but Twilio credentials are missing', 'SMS_CONFIG_ERROR');
      }
      this.client = twilio(config.sms.accountSid, config.sms.authToken);
    }
  }

  async sendConvocation(players: PlayerContact[], convocationData: ConvocationData): Promise<{
    sent: number;
    failed: number;
    details: Array<{ player: string; status: string; error?: string }>;
  }> {
    if (!config.sms.enabled) {
      logger.warn('SMS service is disabled. Set SMS_ENABLED=true to enable it.');
      return {
        sent: 0,
        failed: players.length,
        details: players.map((p) => ({
          player: `${p.prenom || ''} ${p.nom}`.trim(),
          status: 'skipped',
          error: 'SMS service disabled',
        })),
      };
    }

    if (!this.client) {
      throw new AppError(500, 'SMS client not initialized', 'SMS_CLIENT_ERROR');
    }

    const message = this.generateConvocationMessage(convocationData);
    const results = {
      sent: 0,
      failed: 0,
      details: [] as Array<{ player: string; status: string; error?: string }>,
    };

    for (const player of players) {
      try {
        if (!player.telephone) {
          results.failed++;
          results.details.push({
            player: `${player.prenom || ''} ${player.nom}`.trim(),
            status: 'failed',
            error: 'No phone number',
          });
          continue;
        }

        const result = await this.client.messages.create({
          body: message.replace('{nom}', `${player.prenom || ''} ${player.nom}`.trim()),
          from: config.sms.phoneNumber,
          to: player.telephone,
        });

        if (result.status === 'queued' || result.status === 'sent' || result.status === 'delivered') {
          results.sent++;
          results.details.push({
            player: `${player.prenom || ''} ${player.nom}`.trim(),
            status: 'sent',
          });
          logger.info(`SMS sent to ${player.nom}: ${result.sid}`);
        } else {
          results.failed++;
          results.details.push({
            player: `${player.prenom || ''} ${player.nom}`.trim(),
            status: 'failed',
            error: `Unexpected status: ${result.status}`,
          });
        }
      } catch (error) {
        results.failed++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.details.push({
          player: `${player.prenom || ''} ${player.nom}`.trim(),
          status: 'failed',
          error: errorMessage,
        });
        logger.error(`Failed to send SMS to ${player.nom}:`, error);
      }
    }

    return results;
  }

  private generateConvocationMessage(data: ConvocationData): string {
    let message = `⚽ CONVOCATION\n\nBonjour {nom},\n\n`;
    message += `Vous êtes convoqué(e) pour le match :\n\n`;
    message += `📅 Date : ${data.matchDate}\n`;
    message += `🕐 Heure : ${data.matchTime}\n`;
    message += `📍 Lieu : ${data.location}\n`;

    if (data.opponent) {
      message += `🆚 Adversaire : ${data.opponent}\n`;
    }

    message += `\nMerci de confirmer votre présence.\n`;
    message += `En cas d'absence, prévenez au plus vite.\n\n`;
    message += `L'équipe vous souhaite un bon match ! 💪`;

    return message;
  }

  // Method for testing SMS without actually sending
  generatePreview(players: PlayerContact[], convocationData: ConvocationData): string[] {
    const baseMessage = this.generateConvocationMessage(convocationData);
    return players.map((player) =>
      baseMessage.replace('{nom}', `${player.prenom || ''} ${player.nom}`.trim())
    );
  }
}
