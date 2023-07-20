import axios from 'axios';
import { cartState } from '../reducers/cartReducer';

export const userCart = async (cart: cartState, authtoken: string) =>
  await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken: string) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken: string) =>
  await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

// export const saveUserAddress = async (authtoken:string, address) =>
//   await axios.post(
//     `${import.meta.env.VITE_REACT_APP_API}/user/address`,
//     { address },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );

// export const applyCoupon = async (authtoken:string, coupon) =>
//   await axios.post(
//     `${import.meta.env.VITE_REACT_APP_API}/user/cart/coupon`,
//     { coupon },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );

// export const createOrder = async (stripeResponse, authtoken) =>
//   await axios.post(
//     `${import.meta.env.VITE_REACT_APP_API}/user/order`,
//     { stripeResponse },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );

// export const getUserOrders = async (authtoken) =>
//   await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/orders`, {
//     headers: {
//       authtoken,
//     },
//   });

export const getWishlist = async (authtoken: string) =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId: string, authtoken: string) =>
  await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId: string, authtoken: string) =>
  await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

// export const createCashOrderForUser = async (authtoken, COD, coupon) =>
//   await axios.post(
//     `${import.meta.env.VITE_REACT_APP_API}/user/cash-order`,
//     { couponApplied: coupon, COD },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
