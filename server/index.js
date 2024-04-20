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


app.get('/api/patients/:patientId', async (req, res) => {
    try {
      const { patientId } = req.params;
      const response = await axios.get(`http://65.0.8.212:3030/EMR/GetPatientByID/${patientId}`);
      res.json(response.data);
    } catch (error) {
      console.error('Failed to fetch patient data:', error);
      res.status(500).json({ error: 'Failed to fetch patient record.' });
    }
  });

const port = 4269;
app.listen(port, '0.0.0.0',() => console.log(`Server is running on port ${port}`)) // for aws

// const port = 8000;
// app.listen(port, () => console.log(`Server is running on port ${port}`)) // for testing on local