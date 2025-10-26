import 'dotenv/config';
export const env = {
  PORT: Number(process.env.PORT || 4000),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library_crud',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
