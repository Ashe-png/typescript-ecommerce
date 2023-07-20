import { Schema, model } from 'mongoose';
import { IBrand } from './types';

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    image: {
      type: Object,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Brand = model('Brand', brandSchema);
export default Brand;
