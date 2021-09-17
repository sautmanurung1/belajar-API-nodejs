exports.register = (req,res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const result = {
        message: "Register Success",
        data :{
            uid: 1,
            name : name,
            email : email,
        }
    }
    res.status(201).json(result);
}
exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const result = {
        message: "Login Success",
        data : {
            uid:1,
            name : "Testing",
            email:email,
            password: password,
        }
    }
    res.status(201).json(result);
}