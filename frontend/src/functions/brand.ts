import axios from 'axios';
import { IBrand } from './types';

export const getBrands = async () => {
  return await axios.get(`${import.meta.env.VITE_REACT_APP_API}/brands`);
};

export const getBrand = async (slug: string) => {
  return await axios.get(`${import.meta.env.VITE_REACT_APP_API}/brand/${slug}`);
};

export const removeBrand = async (slug: string, authtoken: string) => {
  return await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API}/brand/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateBrand = async (
  slug: string,
  brand: IBrand,
  authtoken: string
) => {
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/brand/${slug}`,
    brand,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createBrand = async (brand: IBrand, authtoken: string) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/brand`,
    brand,
    {
      headers: {
        authtoken,
      },
    }
  );
};

// export const getCategorySubs = async (_id: string) => {
//   return await axios.get(
//     `${import.meta.env.VITE_REACT_APP_API}/brand/subs/${_id}`
//   );
// };
