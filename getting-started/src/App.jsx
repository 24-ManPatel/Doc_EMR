import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
import NewVisit from './pages/NewVisit';
import PastRecords from './pages/PastRecords';
import Bookings from './pages/Bookings';
import Welcome from './pages/Welcome';
// import DoctorProfileSetup from './pages/Profile';

//axios.defaults.baseURL = 'http://65.0.8.212:4269'; // server IP

axios.defaults.baseURL = 'http://localhost:8000'; //testing on local 

axios.defaults.withCredentials = true
function App() {
  return (
    <UserContextProvider>
      <Navbar></Navbar>
      <Toaster position='bottom-center' toastOptions={{ duration: 8000 }}></Toaster>
      <Routes>
        <Route path='/' element={<Welcome />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/newVisit' element={<NewVisit />}></Route>
        <Route path='/pastRecords' element={<PastRecords />}></Route>
        <Route path='/bookings' element={<Bookings />}></Route>
        {/* <Route path='/profile' element={<DoctorProfileSetup/>}></Route> */}
      </Routes>
    </UserContextProvider>
  )
}

export default App
