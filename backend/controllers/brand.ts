import { Request, Response } from 'express';
import Brand from '../models/brand';
import Product from '../models/product';
import slugify from 'slugify';

export const create = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;

    const brand = await new Brand({
      name,
      slug: slugify(name),
      image: image,
    }).save();
    res.json(brand);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create brand failed');
  }
};

export const list = async (req: Request, res: Response) => {
  res.json(await Brand.find({}).sort({ createdAt: -1 }).exec());
};

export const read = async (req: Request, res: Response) => {
  let brand = await Brand.findOne({ slug: req.params.slug }).exec();
  //    res.json(category);
  const products = await Product.find({ brand }).populate('brand').exec();
  res.json({
    brand,
    products,
  });
};

export const update = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const updated = await Brand.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('Brand update failed');
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await Brand.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('Brand delete failed');
  }
};

// export const getSubs = async (req: Request, res: Response) => {
//   const subs = await Sub.find({ parent: req.params._id }).exec();
//   res.json(subs);
// };
