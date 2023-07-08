import express from 'express';

const router = express.Router();

// import {authCheck, adminCheck } from './middlewares/auth'

//controller

import { createOrUpdateUser } from '../controllers/auth';

router.post('/create-or-update-user', createOrUpdateUser);
// router.post('/current-user', authCheck, currentUser);
// router.post('/current-admin', authCheck, adminCheck, currentUser);

export default router;
