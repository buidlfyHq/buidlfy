import { model, Schema, Document } from 'mongoose';
import { User } from '@/interfaces/users.interface';

const userSchema: Schema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  walletName: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    unique: true,
    sparse: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  whitelisted: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
