import mongoose from 'mongoose';
import { env } from '../lib/helpers/fallback';

export default async function LoadMongooseConnection(): Promise<void> {
  await mongoose.connect(env('MONGO_URL', ''));

  console.log('The connection has been made to the database');
}
