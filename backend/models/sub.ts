import { Schema, Types, model } from 'mongoose';

export interface ISub {
  name: string;
  slug: string;
  parent: Types.ObjectId;
}

const subSchema = new Schema<ISub>(
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
