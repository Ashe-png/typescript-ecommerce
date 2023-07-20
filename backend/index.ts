import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
require('dotenv').config();

import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/category';
import subRoutes from './routes/sub';
import productRoutes from './routes/product';
import cloudinaryRoutes from './routes/cloudinary';
import brandRoutes from './routes/brand';

//app
const app = express();

const routes = [
  userRoutes,
  authRoutes,
  categoryRoutes,
  subRoutes,
  productRoutes,
  cloudinaryRoutes,
  brandRoutes,
];

function logMessage() {
  // Replace this line with the action you want to perform every 14 minutes.
  console.log('This message will be logged every 14 minutes.');
}

// Initial log
logMessage();

// Schedule the repeated log every 14 minutes
const interval = 14 * 60 * 1000; // 14 minutes in milliseconds
setInterval(logMessage, interval);
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
