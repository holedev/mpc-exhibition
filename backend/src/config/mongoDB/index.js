import mongoose from 'mongoose';

mongoose
    .connect(process.env.MONGODB_ATLAS)
    .then((res) => console.log('Connected to MONGODB'))
    .catch((err) => console.log(err));
