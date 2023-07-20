import axios from 'axios';
import { ISub } from './types';

export const getSubs = async () => {
  return await axios.get(`${import.meta.env.VITE_REACT_APP_API}/subs`);
};

export const getSub = async (slug: string) => {
  return await axios.get(`${import.meta.env.VITE_REACT_APP_API}/sub/${slug}`);
};

export const removeSub = async (slug: string, authtoken: string) => {
  return await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API}/sub/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateSub = async (slug: string, sub: ISub, authtoken: string) => {
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/sub/${slug}`,
    sub,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createSub = async (sub: ISub, authtoken: string) => {
  return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
};
