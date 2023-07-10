import express from 'express';

const router1 = express.Router();

//middlewares
import { authCheck, adminCheck } from '../middlewares/auth';

//controller
import { create, read, update, remove, list } from '../controllers/sub';

//routes
router1.post('/sub', authCheck, adminCheck, create);
router1.get('/subs', list);
router1.get('/sub/:slug', read);
router1.put('/sub/:slug', authCheck, adminCheck, update);
router1.delete('/sub/:slug', authCheck, adminCheck, remove);

export default router1;
