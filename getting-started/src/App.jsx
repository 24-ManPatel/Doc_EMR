import './App.css'
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = 'http://65.0.8.212:4269'; // server IP
axios.defaults.withCredentials=true  
function App() {
  return (
    <UserContextProvider>
      <Navbar></Navbar>
      <Toaster position='bottom-center' toastOptions={{duration : 8000}}></Toaster>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
