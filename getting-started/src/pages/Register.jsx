import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        // Regex pattern for validating email
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email);
    };

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        let validationErrors = {};

        // Validate name
        if (!name.trim()) {
            validationErrors.name = 'Name is required';
        }

        // Validate email
        if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        // Validate password (basic example: at least 8 characters, one number, one upper, one lower case letter)
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/)) {
            validationErrors.password = 'Password must be at least 8 characters and atmost of 12 characters, contain a number, an uppercase and a lowercase letter';
        }

        // If there are any validation errors, set the errors state and return early
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If validation passes, proceed with the API call
        try {
            const { data } = await axios.post('/register', {
                name, email, password
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                toast.success('Registration successful. Welcome!');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <h1 className="text-center text-2xl font-bold text-gray-900 mb-6">Register Your Account</h1>
                </div>
                <form onSubmit={registerUser} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" placeholder='Enter Name ...' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                               className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                 errors.name ? 'border-red-500' : 'border-gray-300'
                               } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" placeholder='Enter E-mail ...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
                               className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                 errors.email ? 'border-red-500' : 'border-gray-300'
                               } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" placeholder='Enter Password ...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}
                               className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                 errors.password ? 'border-red-500' : 'border-gray-300'
                               } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div>
                        <button type='submit' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
