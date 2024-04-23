import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-semibold text-xl text-white">DocEMR</span>
          <div>
            <button onClick={handleSignIn} className="text-white hover:underline mr-4">
              Sign In
            </button>
            <button onClick={handleSignUp} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Sign Up
            </button>
          </div>
        </div>
      </nav>
      
      {/* Content */}
      <div className="flex-grow flex">
        {/* Left half - Image container */}
        <div className="w-1/2 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('undraw_doctor_kw-5-l (1).svg')` }}>
          {/* Empty div for background image */}
        </div>

        {/* Right half - Content container */}
        <div className="w-1/2 bg-white flex flex-col justify-center p-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-indigo-700 mb-6">Welcome Back to DocEMR</h1>
            <p className="text-lg text-gray-700 mb-4">
              We're excited to have you back! At DocEMR, we ensure that managing your medical records is as easy and secure as possible.
            </p>
            <p className="text-lg text-gray-700">
              Join our community and start experiencing a seamless approach to medical record-keeping. Our platform is designed for both medical professionals and patients to collaborate effectively.
            </p>
          </div>
          <div className="space-y-6">
            <button
              onClick={handleSignUp}
              className="w-full bg-indigo-600 text-white text-lg px-6 py-3 rounded hover:bg-indigo-700 transition ease-in-out duration-150"
            >
              Sign Up Now
            </button>
            <button
              onClick={handleSignIn}
              className="w-full bg-transparent border-2 border-indigo-600 text-indigo-600 text-lg px-6 py-3 rounded hover:bg-indigo-600 hover:text-white transition ease-in-out duration-150"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
