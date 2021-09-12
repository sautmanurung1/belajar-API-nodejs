const express = require('express');

const app = express();

const productsRouters = require('../project/src/routers/products')

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use('/v1/', productsRouters);
app.use(() => {
    console.log('Welcome!');
})


app.listen(4000);