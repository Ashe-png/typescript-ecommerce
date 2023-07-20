import { Schema, model } from 'mongoose';
import { IUser } from './types';

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export default User;
