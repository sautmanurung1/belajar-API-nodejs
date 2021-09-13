const express = require('express');
const app = express();
const authRouters = require('../project/src/routers/auth');
const blogRouters = require('../project/src/routers/blog');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
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
})
app.use(() => {
    console.log('Welcome!');
})


app.listen(4000);