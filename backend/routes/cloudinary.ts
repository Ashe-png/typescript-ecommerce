import express from 'express';

const router1 = express.Router();

//middlewares
import { authCheck, adminCheck } from '../middlewares/auth';

//controllers
import { upload, remove } from '../controllers/cloudinary';

router1.post('/uploadimages', authCheck, adminCheck, upload);
router1.post('/removeimage', authCheck, adminCheck, remove);

export default router1;
