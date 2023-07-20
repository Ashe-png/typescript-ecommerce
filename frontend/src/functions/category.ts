import axios from 'axios';
import { ICategory } from './types';

export const getCategories = async () => {
  return await axios.get(`${import.meta.env.VITE_REACT_APP_API}/categories`);
};

export const getCategory = async (slug: string) => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/category/${slug}`
  );
};

export const removeCategory = async (slug: string, authtoken: string) => {
  return await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API}/category/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateCategory = async (
  slug: string,
  category: ICategory,
  authtoken: string
) => {
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCategory = async (
  category: ICategory,
  authtoken: string
) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/category`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCategorySubs = async (_id: string) => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/category/subs/${_id}`
  );
};
