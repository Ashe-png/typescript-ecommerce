import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  address: string;
}

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
    // cart: {
    //   type: Array,
    //   default: [],
    // },
    address: String,
    // wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export default User;
