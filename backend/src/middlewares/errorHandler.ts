import { Request, Response, NextFunction } from 'express';
import { AppError } from '@types/index';
import { sendError } from '@utils/response';
import { logger } from '@utils/logger';
import { config } from '@config/env';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): Response => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: config.isDevelopment ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Handle known AppError
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode, err.code, err.details);
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return sendError(res, 'A record with this value already exists', 409, 'DUPLICATE_ENTRY');
      case 'P2025':
        return sendError(res, 'Record not found', 404, 'NOT_FOUND');
      case 'P2003':
        return sendError(res, 'Foreign key constraint failed', 400, 'FOREIGN_KEY_ERROR');
      default:
        return sendError(res, 'Database error occurred', 500, 'DATABASE_ERROR', err.code);
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return sendError(res, 'Invalid data provided', 400, 'VALIDATION_ERROR');
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 401, 'INVALID_TOKEN');
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', 401, 'TOKEN_EXPIRED');
  }

  // Handle validation errors from class-validator
  if (err.name === 'ValidationError') {
    return sendError(res, 'Validation failed', 400, 'VALIDATION_ERROR', err.message);
  }

  // Default to 500 server error
  return sendError(res, 'Internal server error', 500, 'INTERNAL_ERROR', config.isDevelopment ? err.stack : undefined);
};

export const notFoundHandler = (req: Request, res: Response): Response => {
  return sendError(res, `Route ${req.method} ${req.path} not found`, 404, 'NOT_FOUND');
};
