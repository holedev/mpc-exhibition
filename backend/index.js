import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './src/config/firebase/index.js';
import './src/config/mongoDB/index.js';
import postRoute from './src/api/routes/post.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    }),
    express.json({
        limit: '10mb',
    })
);

app.use('/post', postRoute);

app.listen(PORT, (req, res) => {
    console.log('Connected to server ...');
});
