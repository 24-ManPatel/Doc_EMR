const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test , registerUser , loginUser , getProfile, getAllDoctors, searchDoctors} = require('../controllers/authController')

// middleware

router.use(
    cors({
        credentials:true,
        origin:['http://65.0.8.212:5173','http://65.0.8.212:3030'] //for aws
        //origin: 'http://localhost:5173'  //for testing on localhost
    })
) // allow cross-origin

router.get('/',test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile',getProfile)
router.get('/doctors', getAllDoctors);
router.get('/doctors/search', searchDoctors);


module.exports = router