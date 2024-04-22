import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register'); // Adjust the path as necessary
  };

  const handleSignIn = () => {
    navigate('/login'); // Adjust the path as necessary
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600 mb-8">DocEMR</h1>
      <p className="text-center text-xl mb-8 max-w-md">
        Welcome to DocEMR, your reliable digital partner for managing electronic medical records with ease and efficiency.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleSignUp}
          className="bg-indigo-600 text-white text-md px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Sign Up
        </button>
        <button
          onClick={handleSignIn}
          className="bg-white text-indigo-600 text-md px-4 py-2 rounded-md shadow hover:shadow-lg transition-shadow"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
