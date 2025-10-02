import 'dotenv/config';

export default {
  schema: './src/models/*.js', // your schema files
  out: './drizzle', // migrations will be stored here
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
