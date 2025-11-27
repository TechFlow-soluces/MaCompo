import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  API_VERSION: z.string().default('v1'),
  DATABASE_URL: z.string(),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  RATE_LIMIT_WINDOW_MS: z.string().default('60000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  SMS_ENABLED: z.string().default('false'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('debug'),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error('❌ Invalid environment variables:', envValidation.error.format());
  process.exit(1);
}

export const config = {
  nodeEnv: envValidation.data.NODE_ENV,
  port: parseInt(envValidation.data.PORT, 10),
  apiVersion: envValidation.data.API_VERSION,
  database: {
    url: envValidation.data.DATABASE_URL,
  },
  cors: {
    origin: envValidation.data.CORS_ORIGIN,
  },
  rateLimit: {
    windowMs: parseInt(envValidation.data.RATE_LIMIT_WINDOW_MS, 10),
    maxRequests: parseInt(envValidation.data.RATE_LIMIT_MAX_REQUESTS, 10),
  },
  sms: {
    enabled: envValidation.data.SMS_ENABLED === 'true',
    accountSid: envValidation.data.TWILIO_ACCOUNT_SID,
    authToken: envValidation.data.TWILIO_AUTH_TOKEN,
    phoneNumber: envValidation.data.TWILIO_PHONE_NUMBER,
  },
  log: {
    level: envValidation.data.LOG_LEVEL,
  },
  isDevelopment: envValidation.data.NODE_ENV === 'development',
  isProduction: envValidation.data.NODE_ENV === 'production',
  isTest: envValidation.data.NODE_ENV === 'test',
} as const;
