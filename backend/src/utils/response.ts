import { Response } from 'express';
import { ApiResponse } from '@types/index';
import { config } from '@config/env';

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      version: config.apiVersion,
    },
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  code?: string,
  details?: unknown
): Response => {
  const response: ApiResponse = {
    success: false,
    error: {
      message,
      code,
      details: config.isDevelopment ? details : undefined,
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: config.apiVersion,
    },
  };
  return res.status(statusCode).json(response);
};
