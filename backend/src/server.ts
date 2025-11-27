import 'reflect-metadata';
import app from './app';
import { config } from '@config/env';
import { connectDatabase, disconnectDatabase } from '@config/database';
import { logger } from '@utils/logger';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Start server
    const server = app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`);
      logger.info(`📍 Environment: ${config.nodeEnv}`);
      logger.info(`🔗 API: http://localhost:${config.port}/api/${config.apiVersion}`);
      logger.info(`💉 Health check: http://localhost:${config.port}/api/${config.apiVersion}/health`);
      if (config.sms.enabled) {
        logger.info(`📱 SMS service: ENABLED`);
      } else {
        logger.warn(`📱 SMS service: DISABLED (set SMS_ENABLED=true to enable)`);
      }
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string): Promise<void> => {
      logger.info(`${signal} received, shutting down gracefully...`);
      server.close(async () => {
        await disconnectDatabase();
        logger.info('Server closed');
        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
