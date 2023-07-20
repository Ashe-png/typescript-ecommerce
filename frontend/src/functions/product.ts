import axios from 'axios';
import { ICategory } from './category';

export interface IImage {
  public_id: string;
  url: string;
}

export interface IProduct {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  categories?: Array<ICategory>;
  category?: string;
  subs?: Array<string>;
  quantity?: number;
  sold?: number;
  images?: Array<IImage>;
  shipping?: string;
  color?: string;
  brand?: string;
  ratings?: any;
}

export const createProduct = async (product: IProduct, authtoken: string) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/product`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getProductsByCount = async (count: number) => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/products/${count}`
  );
};

export const removeProduct = async (slug: string, authtoken: string) => {
  return await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API}/product/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getProduct = async (slug: string) => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/product/${slug}`
  );
};

export const updateProduct = async (
  slug: string,
  product: IProduct,
  authtoken: string
) => {
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );
};

// export const getProducts = async (sort, order, page) => {
//   return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/products`, {
//     sort,
//     order,
//     page,
//   });
// };

export const getProductsCount = async () => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/products/total`
  );
};

// export const productStar = async (productId: string, star, authtoken: string) => {
//   return await axios.put(
//     `${import.meta.env.VITE_REACT_APP_API}/product/star/${productId}`,
//     { star },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
// };

// export const getRelated = async (productId) => {
//   return await axios.get(
//     `${import.meta.env.VITE_REACT_APP_API}/product/related/${productId}`
//   );
// };

// export const fetchProductsByFilter = async (arg) => {
//   return await axios.post(
//     `${import.meta.env.VITE_REACT_APP_API}/search/filter`,
//     arg
//   );
// };
