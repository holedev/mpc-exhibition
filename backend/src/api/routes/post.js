import express from 'express';
import PostController from '../controllers/post.js';
import Authorization from '../middlewares/authorization.js';
const route = express.Router();

route.get('/:userID', PostController.getAllPost);

route.post('/create', PostController.createPost);
route.post(
    '/react/:idPost',
    Authorization.isAuthorized,
    PostController.reactPost
);

export default route;
