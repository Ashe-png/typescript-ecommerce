import { Schema, model } from 'mongoose';
import { ICategory } from './types';

const categorySchema = new Schema<ICategory>(
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

const Category = model('Category', categorySchema);
export default Category;
