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


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-center text-2xl font-bold text-gray-900 mb-6">Register Your Account</h1>
                <form onSubmit={registerUser} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="contactNumber" className="sr-only">Contact Number</label>
                        <input id="contactNumber" name="contactNumber" type="number" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contact Number" onChange={handleChange} value={data.contactNumber} />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">email</label>
                        <input id="email" name="email" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="E-mail" onChange={handleChange} value={data.email} />
                    </div>
                    <div>
                        <label htmlFor="doctorType" className="block text-sm font-medium text-gray-700">Type of Doctor</label>
                        <select
                            id="doctorType"
                            name="doctorType"
                            required
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            onChange={handleChange}
                            value={data.doctorType}
                        >
                            <option value="" disabled={!data.doctorType}>Select your specialty</option>
                            <option value="cardiologist">Cardiologist</option>
                            <option value="dermatologist">Dermatologist</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="orthopedist">Orthopedist</option>
                            <option value="pediatrician">Pediatrician</option>
                            <option value="surgeon">Surgeon</option>
                            {/* Add more options as per your requirements */}
                        </select>
                    </div>

                    <div>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="City"
                            onChange={handleChange}
                            value={data.city}
                        />
                    </div>

                    <div>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="State"
                            onChange={handleChange}
                            value={data.state}
                        />
                    </div>

                    <div>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Country"
                            onChange={handleChange}
                            value={data.country}
                        />
                    </div>

                    <div>
                        <input
                            id="clinicAddress"
                            name="clinicAddress"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Clinic Address"
                            onChange={handleChange}
                            value={data.clinicAddress}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" placeholder='Enter Password ...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>

                    <div>
                        <input
                            id="experience"
                            name="experience"
                            type="number"
                            min="0"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Experience in years"
                            onChange={handleChange}
                            value={data.experience}
                        />
                    </div>
                    <div>
                        <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">Your Doctor Id</label>
                        <input
                            id="doctorId"
                            name="doctorId"
                            type="text"
                            readOnly
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none sm:text-sm"
                            placeholder="Doctor ID"
                            onChange={handleChange}
                            value={data.doctorId} 
                        />
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Complete Profile Setup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

