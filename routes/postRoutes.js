import { app } from "../app";
import { deletePost, createPost, updatePost } from '../controllers/postConroller';
import { readPost } from '../controllers/userController';

const router = app.router();

router.get('/', verifyToken, readPost);
router.post('/', verifyToken, createPost);
router.put('/', verifyToken, updatePost);
router.delete('/', verifyToken, deletePost);

module.exports = router;