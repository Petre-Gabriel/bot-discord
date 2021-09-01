import mongoose from 'mongoose';
import HasbullaGifInterface from './HasbullaGif.interface';
import HasbullaGifSchema from './HasbullaGif.schema';

const HasbullaGifModel = mongoose.model<HasbullaGifInterface>('hasbulla-gif', HasbullaGifSchema);

export default HasbullaGifModel;
