import { model, Schema, Document } from 'mongoose';

const userSchema: Schema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  handle: {
    type: String,
    unique: true,
  },
  whitelisted: Boolean,
});

const userModel = model<Document>('User', userSchema);

export default userModel;
