const User = require('../models/user');


const { hashPassword , coPass} = require('../helpers/auth') 
const jwt = require('jsonwebtoken');

const test = (req,res) => {
    res.json('test is working')
}


// register end point
const registerUser = async (req, res) => {
    try {
        const {
            name, email, password, contactNumber, 
            clinicAddress, experience, doctorType, city, state, country, doctorId
        } = req.body;

        // Validation checks
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }
        
        if (contactNumber.length !== 10) {
            return res.status(400).json({ error: 'Contact number should be of length 10.' });
        }
        // Additional validations can be added here

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        const hashedPassword = await hashPassword(password);

        // Create user with all provided data
        const user = await User.create({
            name, email, password: hashedPassword, contactNumber,
            clinicAddress, experience, doctorType,city, state, country, doctorId
        });

        res.json({ success: true, message: "Registration successful", user });
    } catch (error) {
        console.error('Failed to register user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


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

//palashi boi wanting doctor  
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.find({}, 'name');
        res.json(doctors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// for name , city or doctortype search doctors
const searchDoctors = async (req, res) => {
    try {
        const { name, doctorType, city, doctorId } = req.query;

        // Construct the filter object based on the provided query parameters
        // filer based in provided params
        const filter = {};
        if (name) filter.name = new RegExp(name, 'i');
        if (doctorType) filter.doctorType = doctorType;
        if (city) filter.city = city;
        if (doctorId) filter.doctorId = doctorId;
        // Query the database with filter
        const doctors = await User.find(filter)
            .select('name email contactNumber clinicAddress experience doctorType city state country doctorId');

        res.json(doctors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    test,
    registerUser,
    loginUser , 
    getProfile,
    getAllDoctors,
    searchDoctors
}