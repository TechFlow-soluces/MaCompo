import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@types/index';
import { getRedisClient } from '@config/redis';
import { logger } from '@utils/logger';

export const cache = (ttl: number = 300) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      next();
      return;
    }

    const redis = getRedisClient();
    const key = `cache:${req.user.userId}:${req.method}:${req.originalUrl}`;

    try {
      const cachedData = await redis.get(key);

      if (cachedData) {
        logger.debug(`Cache hit for key: ${key}`);
        res.json(JSON.parse(cachedData));
        return;
      }

      // Store original json method
      const originalJson = res.json.bind(res);

      // Override json method to cache response
      res.json = function (data: unknown): Response {
        redis
          .setex(key, ttl, JSON.stringify(data))
          .then(() => {
            logger.debug(`Cache set for key: ${key} with TTL: ${ttl}s`);
          })
          .catch((error) => {
            logger.error('Redis cache set error:', error);
          });

        return originalJson(data);
      };

      next();
    } catch (error) {
      logger.error('Redis cache error:', error);
      next();
    }
  };
};

export const clearCache = async (userId: string, pattern: string = '*'): Promise<void> => {
  const redis = getRedisClient();
  const key = `cache:${userId}:${pattern}`;

  try {
    const keys = await redis.keys(key);
    if (keys.length > 0) {
      await redis.del(...keys);
      logger.debug(`Cleared ${keys.length} cache entries for pattern: ${key}`);
    }
  } catch (error) {
    logger.error('Redis cache clear error:', error);
  }
};
