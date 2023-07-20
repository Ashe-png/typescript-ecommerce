import express, { Response, Request } from 'express';

const router = express.Router();

// import { authCheck, adminCheck } from './middlewares/auth';

//controller
// const { createOrUpdateUser, currentUser } = require('../controllers/auth');

// router.post('/create-or-update-user', authCheck, createOrUpdateUser);
// router.post('/current-user', authCheck, currentUser);
// router.post('/current-admin', authCheck, adminCheck, currentUser);
router.get('/user', (req: Request, res: Response) => {
  res.json({
    data: 'hey you hit user api endpoint',
  });
});

export default router;
