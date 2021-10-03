const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const path = require('path');
const authRouters = require('../project/src/routers/auth.js');
const blogRouters = require('../project/src/routers/blog.js');
const fileStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, '../project/src/images');
    },
    filename:(req,file,cb) =>{
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req,file,cb) =>{
    if(
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}; 
app.use(express.json());
app.use('/project/src/images', express.static(path.join(__dirname, '../project/src/images')));
app.use(express.urlencoded({ extended: true }));
app.use(multer({
    storage: fileStorage,
    fileFilter : fileFilter}).single('image'));
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/v1/auth', authRouters);
app.use('/v1/blog', blogRouters);
app.use((error,req, res, next)=>{
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message, 
        data:data,
    })
});

mongoose.connect('mongodb://sautmanurung1:sautmanurung1@cluster0-shard-00-00.npqx9.mongodb.net:27017,cluster0-shard-00-01.npqx9.mongodb.net:27017,cluster0-shard-00-02.npqx9.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dc2dw4-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(()=>{
    app.listen(4000, () => console.log('Connection Success'))
})
.catch(err => console.log(err));