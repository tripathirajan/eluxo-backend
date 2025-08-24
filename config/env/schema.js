const { z } = require('zod');

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['local', 'staging', 'production', 'test'])
      .default('local'),
    PORT: z.coerce.number().default(3300),

    // DB configs
    DB_URI: z.string().optional(),
    TEST_DB_URI: z.string().optional(),

    // Security
    APP_SECRET: z
      .string()
      .min(32, 'APP_SECRET must be at least 32 characters long.'),
    JWT_ACCESS_SECRET: z
      .string()
      .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters long.'),
    JWT_REFRESH_SECRET: z
      .string()
      .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters long.'),

    // CORS
    CORS_ALLOWED_ORIGINS: z.string().optional(),
    CORS_ALLOWED_HEADERS: z
      .string()
      .default('Content-Type,Authorization,X-Requested-With'),
    CORS_ALLOWED_METHODS: z.string().default('GET,POST,PUT,DELETE,OPTIONS'),
    JWT_ACCESS_EXPIRY: z.string().default('15m'),
    JWT_REFRESH_EXPIRY: z.string().default('7d'),
    COOKIE_DOMAIN: z.string().default('localhost'),
    REFRESH_COOKIE_NAME: z.string().default('eluxo_rt'),
    REFRESH_COOKIE_PATH: z.string().default('/api/v1/auth/refresh'),
    XSRF_COOKIE_NAME: z.string().default('XSRF-TOKEN'),
    XSRF_COOKIE_PATH: z.string().default('/api/v1/auth/refresh'),
  })
  .superRefine((val, ctx) => {
    // Env-specific rules
    if (val.NODE_ENV === 'production' && !val.DB_URI) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'DB_URI is required in production environment',
        path: ['DB_URI'],
      });
    }
    if (val.NODE_ENV === 'test' && !val.TEST_DB_URI) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'TEST_DB_URI is required in test environment',
        path: ['TEST_DB_URI'],
      });
    }
    if (['production', 'staging'].includes(val.NODE_ENV) && !val.APP_SECRET) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'APP_SECRET is required in production and staging environments',
        path: ['APP_SECRET'],
      });
    }
  });

module.exports = envSchema;
