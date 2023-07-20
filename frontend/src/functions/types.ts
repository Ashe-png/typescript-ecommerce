export interface ISub {
  name?: string;
  slug?: string;
  parent?: string;
  image?: IImage;
  _id?: string;
}

export interface IImage {
  public_id: string;
  url: string;
}

export interface IRating {
  star: number;
  postedBy: string;
}

export interface IProduct2 {
  _id?: string;
  title?: string;
  slug?: string;
  description?: Array<string>;
  price?: number;
  categories?: Array<ICategory>;
  category?: string;
  subs?: Array<string>;
  quantity?: number;
  sold?: number;
  images?: Array<IImage>;
  shipping?: string;
  color?: string;
  brands?: Array<IBrand>;
  brand?: string;
  ratings?: Array<IRating>;
  news?: boolean;
  featured?: boolean;
  bestseller?: boolean;
}

export interface IProduct {
  _id?: string;
  title?: string;
  slug?: string;
  description?: Array<string>;
  price?: number;
  categories?: Array<ICategory>;
  category?: ICategory;
  subs?: Array<ISub>;
  quantity?: number;
  sold?: number;
  images?: Array<IImage>;
  shipping?: string;
  color?: string;
  brands?: Array<IBrand>;
  brand?: IBrand;
  ratings?: Array<IRating>;
  count?: number;
  news?: boolean;
  featured?: boolean;
  bestseller?: boolean;
}

export interface ICategory {
  name?: string;
  slug?: string;
  image?: IImage;
  _id?: string;
}

export interface IBrand {
  name?: string;
  slug?: string;
  image?: IImage;
  _id?: string;
}
