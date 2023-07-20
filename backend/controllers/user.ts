import uniqid from 'uniqid';
import { Request, Response } from 'express';
import Cart from '../models/cart';
import Product from '../models/product';
import User from '../models/user';
import slugify from 'slugify';
import { ICart } from '../models/types';

export const userCart = async (req: Request, res: Response) => {
  // console.log(req.body);
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.body.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user?._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.deleteOne();
    console.log('removed old cart');
  }

  for (let i = 0; i < cart.length; i++) {
    let object: any = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    //get price for creating total

    let productFromDb = await Product.findById(cart[i]._id)
      .select('price')
      .exec();
    object.price = productFromDb?.price;

    products.push(object);
  }

  // console.log('products', products);

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  // console.log('cartTotal', cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user?._id,
  }).save();
  // console.log('new cart--->', newCart);
  res.json({ ok: true });
};

export const getUserCart = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.user.email }).exec();

  let cart = (await Cart.findOne({ orderdBy: user?._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec()) as ICart;

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

export const emptyCart = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user?._id }).exec();
  res.json(cart);
};

export const saveAddress = async (req: Request, res: Response) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.body.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

// export const applyCouponToUserCart = async (req:Request, res:Response) => {
//   const { coupon } = req.body;
//   // console.log('coupon', coupon);

//   const validCoupon = await Coupon.findOne({ name: coupon }).exec();
//   if (validCoupon === null) {
//     return res.json({
//       err: 'Invalid coupon',
//     });
//   }
//   console.log('Valid coupon', validCoupon);

//   const user = await User.findOne({ email: req.body.user.email }).exec();

//   let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
//     .populate('products.product', '_id title price')
//     .exec();

//   console.log('cartTotal', cartTotal, 'discount%', validCoupon.discount);

//   //calculate total after discount
//   let totalAfterDiscount = (
//     cartTotal -
//     (cartTotal * validCoupon.discount) / 100
//   ).toFixed(2);
//   Cart.findOneAndUpdate(
//     { orderdBy: user._id },
//     { totalAfterDiscount },
//     { new: true }
//   ).exec();
//   // console.log('td', td)
//   res.json(totalAfterDiscount);
// };

// export const createOrder = async (req:Request, res:Response) => {
//   const { paymentIntent } = req.body.stripeResponse;
//   const user = await User.findOne({ email: req.body.user.email }).exec();

//   let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

//   let newOrder = await new Order({
//     products,
//     paymentIntent,
//     orderdBy: user._id,
//   }).save();

//   //decrement quantity, increment sold
//   let bulkOption = products.map((item) => {
//     return {
//       updateOne: {
//         filter: { _id: item.product._id },
//         update: { $inc: { quantity: -item.count, sold: +item.count } },
//       },
//     };
//   });
//   let updated = await Product.bulkWrite(bulkOption, {});
//   console.log('PRODUCT QUANTITY++ SOLD--', updated);
//   console.log('new order saved', newOrder);
//   res.json({ ok: true });
// };

// export const orders = async (req:Request, res:Response) => {
//   let user = await User.findOne({ email: req.body.user.email }).exec();

//   let userOrders = await Order.find({ orderdBy: user._id })
//     .populate('products.product')
//     .exec();

//   res.json(userOrders);
// };

export const addToWishlist = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.body.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

export const wishlist = async (req: Request, res: Response) => {
  const list = await User.findOne({ email: req.body.user.email })
    .select('wishlist')
    .populate('wishlist')
    .exec();

  res.json(list);
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.body.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

// export const createCashOrder = async (req:Request, res:Response) => {
//   const { COD, couponApplied } = req.body;

//   //if cod is true, create order with status of Cash On Delivery
//   if (!COD) return res.status(400).send('Create Cash order failed');
//   const user = await User.findOne({ email: req.body.user.email }).exec();

//   let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

//   let finalAmount = 0;

//   if (couponApplied && userCart.totalAfterDiscount) {
//     finalAmount = userCart.totalAfterDiscount * 100;
//   } else {
//     finalAmount = userCart.cartTotal * 100;
//   }

//   let newOrder = await new Order({
//     products: userCart.products,
//     paymentIntent: {
//       id: uniqid(),
//       amount: finalAmount,
//       currency: 'usd',
//       status: 'Cash On Delivery',
//       created: Date.now(),
//       payment_method_types: ['cash'],
//     },
//     orderdBy: user._id,
//     orderStatus: 'Cash On Delivery',
//   }).save();

//   //decrement quantity, increment sold
//   let bulkOption = userCart.products.map((item) => {
//     return {
//       updateOne: {
//         filter: { _id: item.product._id },
//         update: { $inc: { quantity: -item.count, sold: +item.count } },
//       },
//     };
//   });
//   let updated = await Product.bulkWrite(bulkOption, {});
//   console.log('PRODUCT QUANTITY++ SOLD--', updated);
//   console.log('new order saved', newOrder);
//   res.json({ ok: true });
// };
