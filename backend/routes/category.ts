import express from 'express';

const router1 = express.Router();

//middlewares
import { authCheck, adminCheck } from '../middlewares/auth';

//controller
import {
  create,
  read,
  update,
  remove,
  list,
  getSubs,
} from '../controllers/category';

//routes
router1.post('/category', authCheck, adminCheck, create);
router1.get('/categories', list);
router1.get('/category/:slug', read);
router1.put('/category/:slug', authCheck, adminCheck, update);
router1.delete('/category/:slug', authCheck, adminCheck, remove);
router1.get('/category/subs/:_id', getSubs);

export default router1;
