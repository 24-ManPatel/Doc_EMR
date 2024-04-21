import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        try {
            const response = await axios.post('http://65.0.8.212:4269/login', {
                email, password
            }, {
                withCredentials: true
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({   // Resetting the state after successful login
                    email: '',
                    password: '',
                });
                toast.success('Login successful. Welcome!');
                navigate('/home');
            }
        } catch (error) {
            // Handle error appropriately
            console.error("Axios error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <h1 className="text-center text-2xl font-bold text-gray-900 mb-6">Login to Your Account</h1>
                </div>
                <form onSubmit={loginUser} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" placeholder='Enter E-mail ...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
                               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" placeholder='Enter Password ...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}
                               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div>
                        <button type='submit' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
