import express from 'express';
import PostController from '../controllers/post.js';
const route = express.Router();

route.post('/create', PostController.createPost);
route.post('/react', PostController.reactPost);

export default route;
