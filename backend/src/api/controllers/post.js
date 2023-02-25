import Post from '../models/post.js';

const PostController = {
    createPost: async (req, res) => {
        try {
            const {author, url} = req.body;
            const post = await Post.create({author, url});

            return res.status(200).json({
                status: 'success',
                data: post,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                data: err,
            });
        }
    },
    reactPost: async (req, res) => {
        try {
            const {id} = req.body;
            const post = await Post.findById(id);

            if (!post) {
                return res.status(404).json({
                    status: 'error',
                    data: 'Post not found',
                });
            }

            console.log(post.react_list);

            return res.status(200).json({
                status: 'success',
                data: post,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                data: err,
            });
        }
    },
};

export default PostController;
