const User = require('../models/user');
const { hashPassword , coPass} = require('../helpers/auth') 
const jwt = require('jsonwebtoken');

const test = (req,res) => {
    res.json('test is working')
}


// register end point
const registerUser = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        // check if the name was entered
        if(!name){
            return res.json({
                error:'name is required'
            });
        }
        // check for password is good
        if(!password || password.length < 8 ){
            return res.json({
                error:'passwrod is required and should be atleast 6 character long'
            });
        }

        // check email
        const exist = await User.findOne({email})

        if(exist){
            return res.json({
                error:'Email already exists!'
            });
        }

        const hashedPassword = await hashPassword(password)
        // create user in the database
        const user = await User.create({
            name,email,
            password: hashedPassword,
        });

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}


//login Endpoint
const loginUser = async (req , res) => {
    try {
        const {email , password} = req.body;

        // check if the user exist
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error : 'No user found'
            });
        }

        // check if the password match
        const match = await coPass(password, user.password);

        if(match){
            jwt.sign({email: user.email , id: user._id , name: user.name}, process.env.JWT_SECRET , {} , (err,token) => {
                if(err) throw err;
                res.cookie('token',token).json(user)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req , res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser , 
    getProfile
}