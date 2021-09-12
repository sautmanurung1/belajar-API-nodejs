exports.createProducts = (req, res, next) => {
    console.log('request: ', req.body);
    res.json({
        message: 'Create Products success',
        data:{
            id : 1, 
            name : 'sari gandum enak',
            price : 8000,
        }
    })
    next();
}

exports.getALLProducts = (req, res, next) => {
    res.json({
        message : "Get All Products success",
        data:{
            id : 1, 
            name : 'sari gandum enak',
            price : 8000,
        }
    })
    next();
}
