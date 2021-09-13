const express = require('express');
const app = express();
const productsRouters = require('../project/src/routers/products')
const authRouters = require('../project/src/routers/auth');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use('/v1/', productsRouters);
app.use('/v1/auth', authRouters);
app.use(() => {
    console.log('Welcome!');
})


app.listen(4000);