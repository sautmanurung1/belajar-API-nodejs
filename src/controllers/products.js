exports.createProducts = (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json({
        message: 'Create Products success',
        data:{
            id : 1, 
            name : name,
            price : price,
        }
    })
}

exports.getALLProducts = (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json({
        message : "Get All Products success",
        data:{
            id : 1, 
            name : name,
            price : price,
        }
    })
}
