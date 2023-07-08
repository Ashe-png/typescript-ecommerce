import axios from 'axios';

export const createOrUpdateUser = async (authtoken: string) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
