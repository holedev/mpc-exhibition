import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

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

// mongoose
//     .connect(process.env.MONGODB_LOCAL)
//     .then((res) => console.log('Connected to MONGODB'))
//     .catch((err) => console.log(err));

app.listen(PORT, (req, res) => {
    console.log('Connected to server ...');
});
