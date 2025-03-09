import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = "mongodb+srv://lakshman:lakshman@cluster1.dpdsj.mongodb.net/";

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 120000, 
  socketTimeoutMS: 120000, 
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`🚀 Server Running on Port: http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
  });


mongoose.set('strictQuery', false);
