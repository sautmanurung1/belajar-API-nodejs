const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog')
exports.createBlogPost = (req, res) =>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        const err = new Error('Input Value tidak sesuai')
        err.errorStatus = 400;
        err.data = error.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image Harus Di Upload')
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const Post = new BlogPost({
        title : title,
        body : body,
        image: image,
        author: {uid: 1, name : "Saut Manurung"}
    })

    Post.save()
    .then(result => {
        res.status(201).json({
            message: "Create Blog Post Success",
            data: result
        });
    })
    .catch(err => {
        console.log('err : ', err)
    });
}