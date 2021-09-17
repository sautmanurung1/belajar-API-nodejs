const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog')
const path = require('path');
const fs = require('fs');
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

exports.getAllBlogPost = (req,res,next) =>{
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: "Data Blog Berhasil di panggil",
            data:result,
        })
    })
    .catch(err =>{
        next(err);
    })
}


exports.getBlogPostById = (req,res,next) =>{
    const PostId = req.params.postId
    BlogPost.findById(PostId)
    .then(result =>{
        if(!result){
            const error = new Error('Blog Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message:"Data Blog Post Berhasil Di Panggil",
            data:result,
        })
    })
    .catch(err =>{
        next(err);
    });
}

exports.updateBlogPost = (req,res,next) => { 
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

    const PostId = req.params.postId;

    BlogPost.findById(PostId)
    .then(post=>{
        if(!post) {
            const err = new Error('Blog Post tidak ditemukan')
            err.errorStatus = 404;
            throw err;
        }
        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result=>{
        res.status(200).json({
            messages:"Update Success",
            data:result,
        })
    })
    .catch(err => {
        next(err);
    });
}

exports.deleteBlogPost = (req,res, next) =>{
    const postId = req.params.postId

    BlogPost.findById(postId)
    .then(post =>{
        if(!post){
            const err = new Error('Blog Post tidak ditemukan')
            err.errorStatus = 404;
            throw err;
        }
        removeImage(post.image);
        return BlogPost.findByIdAndRemove(postId)
        
    })
    .then(result => {
        res.status(200).json({
            message: 'Hapus Blog Post Berhasil',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) =>{
    console.log('file path', filePath)
    console.log('dirname :', __dirname)
    // D:\Kumpulan Program Saut\Belajar React.JS\project\src\image\
    filePath = path.join(__dirname,'../', filePath)
    fs.unlink(filePath, err => console.log(err))
}