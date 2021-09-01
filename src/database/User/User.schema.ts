import Mongoose from 'mongoose';
import UserInterface from './User.interface';

const UserSchema = new Mongoose.Schema<UserInterface>({
  discordID: {
    type: String,
    required: true,
  },
  muteTime: {
    type: Number,
    required: true,
  },
});

export default UserSchema;
