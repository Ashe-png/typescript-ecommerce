import express from 'express';

const router = express.Router();

//middlewares
import { authCheck, adminCheck } from '../middlewares/auth';

//controller

import { createOrUpdateUser, currentUser } from '../controllers/auth';

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

export default router;
