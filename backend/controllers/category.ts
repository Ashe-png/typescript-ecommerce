import { Request, Response } from 'express';
import Category from '../models/category';
import Product from '../models/product';
import Sub from '../models/sub';
import slugify from 'slugify';

export const create = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;
    const category = await new Category({
      name,
      slug: slugify(name),
      image: image,
    }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create category failed');
  }
};

export const list = async (req: Request, res: Response) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

export const read = async (req: Request, res: Response) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  //    res.json(category);
  const products = await Product.find({ category }).populate('category').exec();
  res.json({
    category,
    products,
  });
};

export const update = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('Category update failed');
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('Category delete failed');
  }
};

export const getSubs = async (req: Request, res: Response) => {
  const subs = await Sub.find({ parent: req.params._id }).exec();
  res.json(subs);
};
