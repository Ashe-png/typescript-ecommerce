import { Schema, model } from 'mongoose';
import { IProduct } from './types';

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
    description: [
      {
        type: String,

        maxlength: 2222,
        text: true,
      },
    ],
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
      type: [],
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
      type: Schema.Types.ObjectId,
      ref: 'Brand',
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    news: Boolean,
    featured: Boolean,
    bestseller: Boolean,
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);
export default Product;
