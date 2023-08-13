/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    CD_CLOUD_NAME: process.env.CD_CLOUD_NAME,
    CD_PRESET_KEY: process.env.CD_PRESET_KEY,
    GMAIL_ID: process.env.GMAIL_ID,
    GMAIL_PASS: process.env.GMAIL_PASS,
  },
};

module.exports = nextConfig;
