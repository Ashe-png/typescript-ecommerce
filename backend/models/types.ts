import { Types } from 'mongoose';

export interface IBrand {
  image: IImage;
  name: string;
  slug: string;
}

export interface IProducts {
  product: Types.ObjectId;
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

export interface ICategory {
  name: string;
  slug: string;
  image?: IImage;
}

export interface IImage {
  title: string;
  images: ArrayConstructor;
}

export interface IImage {
  public_id?: string;
  url?: string;
}

export interface IRating {
  star?: number;
  postedBy?: string;
}

export interface IProduct {
  title?: string;
  slug?: string;
  description?: Array<string>;
  price?: number;
  category?: Types.ObjectId;
  subs?: Array<Types.ObjectId>;
  quantity?: number;
  sold?: number;
  images?: Types.Array<IImage>;
  shipping?: string;
  color?: string;
  brand?: Types.ObjectId;
  ratings?: Array<IRating>;
  news?: boolean;
  featured?: boolean;
  bestseller?: boolean;
}

export interface ISub {
  name: string;
  slug: string;
  image?: IImage;
  parent: Types.ObjectId;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  cart: any;
  address: string;
  wishlist: Array<Types.ObjectId>;
}
