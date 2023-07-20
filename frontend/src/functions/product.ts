import axios from 'axios';
import { IProduct2 } from './types';

export const createProduct = async (product: IProduct2, authtoken: string) => {
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
  product: IProduct2,
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

export const getProducts = async (
  sort: string,
  order: string,
  page: number,
  quer: string
) => {
  return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/products`, {
    sort,
    order,
    page,
    quer,
  });
};

export const getProductsCount = async () => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/products/total`
  );
};

export const productStar = async (
  productId: string,
  star: number,
  authtoken: string
) => {
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getRelated = async (productId: string) => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/product/related/${productId}`
  );
};

export const fetchProductsByFilter = async (arg: object) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/search/filter`,
    arg
  );
};
