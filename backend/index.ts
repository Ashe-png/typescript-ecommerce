import { readdirSync } from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
require('dotenv').config();

import userRoutes from './routes/user';
import authRoutes from './routes/auth';

//app
const app = express();

const routes = [userRoutes, authRoutes];

//db
mongoose
  .connect(process.env.DATABASE!)
  .then(() => console.log('DB CONNECTED successfully'))
  .catch((err: any) => console.log('DB CONNECTION ERR'));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

//routes middleware

routes.forEach((element) => {
  app.use('/api', element);
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
