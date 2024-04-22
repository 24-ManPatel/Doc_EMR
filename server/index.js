const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {mongoose} = require('mongoose')
const axios = require('axios'); 
const cookieParser = require('cookie-parser')

const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('MongoDB Connected!'))
.catch((err) => console.log('database not connected', err))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://65.0.8.212:3030'],
  //origin: ['http://65.0.8.212:5173', 'http://65.0.8.212:3030'],
  credentials: true // Enable credentials
}));

app.use(express.urlencoded({extended:false}))

//for loggin on server problem seeing
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Logging middleware for responses
app.use((req, res, next) => {
  const start = Date.now();
  const originalSend = res.send;
  res.send = function (body) {
    const responseTime = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${res.statusCode} ${req.method} ${req.url} Response Time: ${responseTime}ms Response:`, body);
    originalSend.call(this, body);
  };
  next();
});

app.use('/',require('./routes/authRoutes'))


app.get('/patients/:patientId', async (req, res) => {
  try {
      const { patientId } = req.params;
      const response = await axios.get(`http://65.0.8.212:3030/EMR/GetPatientByID/${patientId}`);
      console.log(response.data)
      if (response.data.status === "5") {
          res.status(404).json({ error: 'No patient found.' });
      } else {
          res.json(response.data);
      }
  } catch (error) {
      console.error('palash ka problem :', error);
      res.status(500).json({ error: 'patient data not coming.' });
  }
});


// const port = 4269;
// app.listen(port, '0.0.0.0',() => console.log(`Server is running on port ${port}`)) // for aws

//const port = 8000;
//app.listen(port, () => console.log(`Server is running on port ${port}`)) // for testing on local
