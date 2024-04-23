import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        clinicAddress: '',
        experience: '',
        doctorType: '',
        city: '',
        state: '',
        country: '',
        doctorId: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const generateDoctorId = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };

        setData(prevData => ({
            ...prevData,
            doctorId: generateDoctorId()
        }));
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSignIn = () => {
        navigate('/login'); // Adjust the path as necessary
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email);
    };

    const registerUser = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!data.name.trim()) {
            validationErrors.name = 'Name is required';
        }
        if (!validateEmail(data.email)) {
            validationErrors.email = 'Please enter a valid email address';
        }
        if (!data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/)) {
            validationErrors.password = 'Password must be at least 8 characters and at most 12 characters, contain a number, an uppercase and a lowercase letter';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const response = await axios.post('/register', data);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({});
                toast.success('Registration successful. Welcome!');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleExit = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <nav className="bg-indigo-600 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-lg font-semibold">EMR Management</div>
                    <div>
                        <button onClick={handleSignIn} className="text-white hover:text-gray-300 font-semibold mr-4">
                            Sign In
                        </button>
                        <button onClick={handleExit} className="text-white hover:text-gray-300 font-semibold">
                            Exit
                        </button>
                    </div>
                </div>
            </nav>
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-center text-2xl font-bold text-gray-900 mb-6">Register Your Account</h1>
                    <form onSubmit={registerUser} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            value={data.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={data.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={data.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            name="contactNumber"
                            placeholder="Contact Number"
                            required
                            value={data.contactNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                            name="clinicAddress"
                            placeholder="Clinic Address"
                            required
                            value={data.clinicAddress}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <select
                            name="doctorType"
                            required
                            value={data.doctorType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select your specialty</option>
                            <option value="cardiologist">Cardiologist</option>
                            <option value="dermatologist">Dermatologist</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="orthopedist">Orthopedist</option>
                            <option value="pediatrician">Pediatrician</option>
                            <option value="surgeon">Surgeon</option>
                            {/* More options can be added here */}
                        </select>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            required
                            value={data.city}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            required
                            value={data.state}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            required
                            value={data.country}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            name="experience"
                            placeholder="Experience in years"
                            min="0"
                            required
                            value={data.experience}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                        >
                            Complete Profile Setup
                        </button>
                    </form>
                    <button
                        onClick={handleSignIn}
                        className="w-full text-indigo-600 py-2 px-4 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white mt-4"
                    >
                        Already have an account? Sign in
                    </button>
                </div>
            </div>
        </div>
    );
    
}

