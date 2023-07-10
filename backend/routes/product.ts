import express from 'express';

const router1 = express.Router();

//middlewares
import { authCheck, adminCheck } from '../middlewares/auth';

//controller
import {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} from '../controllers/product';

//routes
router1.post('/product', authCheck, adminCheck, create);
router1.get('/products/total', productsCount);
router1.get('/products/:count', listAll);
router1.delete('/product/:slug', authCheck, adminCheck, remove);
router1.get('/product/:slug', read);
router1.put('/product/:slug', authCheck, adminCheck, update);

router1.post('/products', list);

//rating
router1.put('/product/star/:productId', authCheck, productStar);
//related
router1.get('/product/related/:productId', listRelated);
//search
router1.post('/search/filter', searchFilters);

export default router1;
