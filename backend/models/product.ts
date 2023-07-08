import { Schema, Types, model } from 'mongoose';

export interface IProduct {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  subs: Array<Types.ObjectId>;
  quantity: number;
  sold: number;
  images: ArrayConstructor;
  shipping: string;
  color: string;
  brand: string;
  ratings: any;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Sub',
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
    },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);
export default Product;
