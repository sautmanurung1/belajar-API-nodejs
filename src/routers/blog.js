const express = require('express');
const {body} = require('express-validator')
const blogController = require('../controllers/blog')
const router = express.Router();

// [POST] : /v1/blog/post
router.post('/post', [body('title').isLength({min: 5}).withMessage('input title tidak sesuai'),
            body('body').isLength({min: 5}).withMessage('input body tidak sesuai')],
            blogController.createBlogPost)


module.exports = router;