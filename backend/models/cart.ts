import { Schema, model, Types } from 'mongoose';
import { IProduct } from './product';

interface IProducts {
  product: IProduct;
  count: number;
  color: string;
  price: number;
}

export interface ICart {
  products: IProducts;
  cartTotal: number;
  totalAfterDiscount: number;
  orderedBy: Types.ObjectId;
}
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
