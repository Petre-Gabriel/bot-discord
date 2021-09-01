import Mongoose from 'mongoose';
import HasbullaGifInterface from './HasbullaGif.interface';

const HasbullaGifSchema = new Mongoose.Schema<HasbullaGifInterface>({
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
});

export default HasbullaGifSchema;
