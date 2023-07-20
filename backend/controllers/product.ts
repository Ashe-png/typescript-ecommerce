import { Request, Response } from 'express';
import Product from '../models/product';
import User from '../models/user';
import slugify from 'slugify';
import { ICategory, ISub, IBrand } from '../models/types';

export const create = async (req: Request, res: Response) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err: any) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

export const listAll = async (req: Request, res: Response) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(products);
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('product delete failed');
  }
};

export const read = async (req: Request, res: Response) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('brand')
    .populate('category')
    .populate('subs')
    .exec();
  res.json(product);
};

export const update = async (req: Request, res: Response) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err: any) {
    console.log('Product update error', err);
    return res.status(400).json({
      err: err.message,
    });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const { sort, order, page, quer } = req.body;
    const currentPage = page || 1;
    const perPage = 12;
    const query: any = {};
    query[quer] = true;

    const products = await Product.find(query)
      .skip((currentPage - 1) * perPage)
      .populate('brand')
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsCount = async (req: Request, res: Response) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

export const productStar = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.body.user.email }).exec();
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product?.ratings?.find(
    (ele: any) => ele.postedBy.toString() === user?._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product?._id,
      {
        $push: { ratings: { star, postedBy: user?._id } },
      },
      { new: true }
    ).exec();
    console.log('ratingAdded', ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { 'ratings.$.star': star } },
      { new: true }
    ).exec();
    console.log('ratingUpdated', ratingUpdated);
    res.json(ratingUpdated);
  }
};

export const listRelated = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product?._id },
    category: product?.category,
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    .exec();

  res.json(related);
};

const handleQuery = async (req: Request, res: Response, query: string) => {
  const products = await Product.find({
    slug: { $regex: query, $options: 'i' },
  })
    .populate('brand', '_id name')
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .exec();
  // console.log('query', query);
  // console.log(products);
  res.json(products);
};

const handlePrice = async (req: Request, res: Response, price: any) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('brand', '_id name')
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (
  req: Request,
  res: Response,
  category: ICategory
) => {
  try {
    let products = await Product.find({ category })
      .populate('brand', '_id name')
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleStar = async (req: Request, res: Response, stars: string) => {
  const starss = parseInt(stars);
  const aggregates = await Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        //title: '$title',
        floorAverage: {
          $floor: { $avg: '$ratings.star' },
        },
      },
    },
    { $match: { floorAverage: { $gte: starss } } },
  ])
    .limit(12)
    .exec();

  const products = await Product.find({ _id: aggregates })
    .populate('brand', '_id name')
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .exec();

  res.json(products);
};

const handleSub = async (req: Request, res: Response, sub: ISub) => {
  const products = await Product.find({ subs: sub })
    .populate('brand', '_id name')
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .exec();

  res.json(products);
};

const handleColor = async (req: Request, res: Response, color: string) => {
  const products = await Product.find({ color })
    .populate('brand', '_id name')
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .exec();

  res.json(products);
};

const handleBrand = async (req: Request, res: Response, brand: IBrand) => {
  const products = await Product.find({ brand })
    .populate('brand', '_id name')
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .exec();

  res.json(products);
};

export const searchFilters = async (req: Request, res: Response) => {
  const { query, price, category, stars, sub, color, brand } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    // console.log('price --->', price)
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log('category --->', category);
    await handleCategory(req, res, category);
  }

  if (stars) {
    console.log('stars--->', stars);
    handleStar(req, res, stars);
  }

  if (sub) {
    console.log('subs---->', sub);
    await handleSub(req, res, sub);
  }

  if (color) {
    console.log('color--->', color);
    await handleColor(req, res, color);
  }

  if (brand) {
    console.log('brand--->', brand);
    await handleBrand(req, res, brand);
  }
};
