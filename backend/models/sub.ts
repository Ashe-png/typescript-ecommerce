import { Schema, model } from 'mongoose';
import { ISub } from './types';

const subSchema = new Schema<ISub>(
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
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

const Sub = model('Sub', subSchema);
export default Sub;
