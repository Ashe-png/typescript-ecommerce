import { Schema, model, Types } from 'mongoose';
import { IImage } from './types';

const imageSchema = new Schema<IImage>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Image = model<IImage>('Image', imageSchema);
export default Image;
