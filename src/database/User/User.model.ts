import mongoose from 'mongoose';
import UserInterface from './User.interface';
import UserSchema from './User.schema';

const UserModel = mongoose.model<UserInterface>('User', UserSchema);

export default UserModel;
