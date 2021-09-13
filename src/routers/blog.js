const express = require('express');

const blogController = require('../controllers/blog')
const router = express.Router();

// [POST] : /v1/blog/post
router.post('/post', blogController.createBlogPost)


module.exports = router;