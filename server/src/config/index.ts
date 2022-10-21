import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SPHERON_API_HOST,
  DEPLOYMENT_ENDPOINT,
  SPHERON_TOKEN,
  ORGANIZATION_ID,
  DECODER_GIT_URL,
  CORS_ADDRESS,
  SITE_DOMAIN_NAME,
  CLOUDFLARE_KEY,
  CLOUDFLARE_EMAIL,
  CDN_CNAME,
  CLOUDFLARE_ZONE_ID,
  WEB3_STORAGE_ACCESS_TOKEN,
} = process.env;