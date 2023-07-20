import { Schema, model, Types } from 'mongoose';

export interface ICategory {
  name: string;
  slug: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, 'Too short'],
      maxlength: [32, 'Too long'],
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
