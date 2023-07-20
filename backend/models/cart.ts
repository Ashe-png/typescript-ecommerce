import { Schema, model } from 'mongoose';
import { ICart } from './types';

const cartSchema = new Schema<ICart>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Cart = model('Cart', cartSchema);
export default Cart;
