import { model, Schema, Document } from 'mongoose';

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
  },
  verified: {
    type: Boolean,
    default: false,
  },
  whitelisted: {
    type: Boolean,
    default: false,
  },
});

const userModel = model<Document>('User', userSchema);

export default userModel;
