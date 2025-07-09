const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');

// @route   POST api/posts/upload
// @desc    Upload image
// @access  Private
router.post('/upload', auth, postController.uploadImage);

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, postController.createPost);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', postController.getAllPosts);

// @route   GET api/posts/user
// @desc    Get user's posts
// @access  Private
router.get('/user', auth, postController.getUserPosts);

// @route   GET api/posts/viewed
// @desc    Get user's viewed posts
// @access  Private
router.get('/viewed', auth, postController.getViewedPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', postController.getPost);

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private
router.put('/:id', auth, postController.updatePost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
