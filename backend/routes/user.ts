import express, { Response, Request } from 'express';

const router1 = express.Router();

import { authCheck, adminCheck } from '../middlewares/auth';

//controller
import {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  addToWishlist,
  wishlist,
  removeFromWishlist,
} from '../controllers/user';

router1.post('/user/cart', authCheck, userCart);
router1.get('/user/cart', authCheck, getUserCart);
router1.delete('/user/cart', authCheck, emptyCart);
router1.post('/user/address', authCheck, saveAddress);

//wishlisht
router1.post('/user/wishlist', authCheck, addToWishlist);
router1.get('/user/wishlist', authCheck, wishlist);
router1.put('/user/wishlist/:productId', authCheck, removeFromWishlist);

export default router1;
