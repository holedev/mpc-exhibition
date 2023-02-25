import mongoose from 'mongoose';

const post = new mongoose.Schema(
    {
        author: String,
        url: String,
        react_list: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
);

const postModels = mongoose.model('post', post);
export default postModels;
