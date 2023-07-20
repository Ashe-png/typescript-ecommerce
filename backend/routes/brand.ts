import express from 'express';

const router1 = express.Router();

//middlewares
import { authCheck, adminCheck } from '../middlewares/auth';

//controller
import { create, read, update, remove, list } from '../controllers/brand';

//routes
router1.post('/brand', authCheck, adminCheck, create);
router1.get('/brands', list);
router1.get('/brand/:slug', read);
router1.put('/brand/:slug', authCheck, adminCheck, update);
router1.delete('/brand/:slug', authCheck, adminCheck, remove);

export default router1;
