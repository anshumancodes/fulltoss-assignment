import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express();
app.use(cors());
app.use(express.json({limit:"12kb"}));
app.use(express.urlencoded({extended:true,limit:"12kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// routes for user management
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

// render health check page
app.get('/healthz', (req, res) => {
  res.send('OK');
});

export default app;