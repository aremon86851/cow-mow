import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASSWORD,
  bcrypt_salt_round: process.env.SALT_ROUNDS,
  access_token: process.env.ACCESS_TOKEN_SECRET,
  access_token_expire_in: process.env.ACCESS_TOKEN_EXPIRE_IN,
  refresh_token: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expire_in: process.env.REFRESH_TOKEN_EXPIRE_IN,
};
