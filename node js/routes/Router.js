

const express = require('express');
const { GetUser, AddUser, EditUser, DeleteUser, exportUsers } = require('../controllers/CRUD');
const { GetPosts, AddPost, EditPost, DeletePost } = require('../controllers/PostControllers');

const router = express.Router();

router.get('/user' ,GetUser)
router.get('/exportUsers' ,exportUsers)
router.post('/addUser' ,AddUser)
router.put('/user/:id' ,EditUser)
router.delete('/user/:id' ,DeleteUser)



router.get('/fetchPosts', GetPosts);
router.post('/addPost', AddPost);
router.put('/updatePost/:id', EditPost);
router.delete('/deletePost/:id', DeletePost);


module.exports = router;