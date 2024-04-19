const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('MongoDB Connected!'))
.catch((err) => console.log('database not connected', err))

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:false}))

app.use('/',require('./routes/authRoutes'))

const port = 4269;
<<<<<<< HEAD
app.listen(port, '0.0.0.0',() => console.log(`Server is running on port ${port}`))
=======
app.listen(port, '0.0.0.0',() => console.log(`Server is running on port ${port}`))

>>>>>>> 34511c31c2cf981e830dbdd43ec098514bd6e0fb
