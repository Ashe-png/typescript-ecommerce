import { Request, Response } from 'express';
import Product from '../models/product';
import Sub from '../models/sub';
import slugify from 'slugify';

export const create = async (req: Request, res: Response) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
    res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create sub failed');
  }
};

export const list = async (req: Request, res: Response) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

export const read = async (req: Request, res: Response) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate('category')
    .exec();
  res.json({
    sub,
    products,
  });
};

export const update = async (req: Request, res: Response) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('create update failed');
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('Sub delete failed');
  }
};
