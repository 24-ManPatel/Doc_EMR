import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAppointments();
    fetchDoctorInfo();
  }, []);

  const fetchAppointments = async () => {
    try {
      //const response = await axios.get('http://localhost:8000/get_appointments');
      const response = await axios.get('http://65.0.8.212:4269/get_appointments');
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const fetchDoctorInfo = async () => {
    try {
      //const response = await axios.get('http://localhost:8000/profile');
      const response = await axios.get('http://65.0.8.212:4269/profile');
      setDoctorInfo(response.data);
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/home');
  }
  const handleBookings = () => {
    navigate('/bookings');
  }

  return (
    <div className="min-h-screen flex flex-col">
        <nav className="bg-indigo-600 p-4 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-lg font-semibold">EMR Manager</h1>
                <div className="flex items-center space-x-4">
                    <button onClick={handleHome} className="text-white hover:text-gray-300 font-semibold">
                        Search Patient
                    </button>
                    <button onClick={handleBookings} className="text-white hover:text-gray-300 font-semibold">
                        Bookings
                    </button>
                    <button onClick={handleLogout} className="text-white hover:text-gray-300 font-semibold">
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
        <div className="mb-4">
            <h1 className="text-2xl font-semibold text-center">Upcoming Bookings</h1>
            {doctorInfo && (
                <div className="mt-2 text-center">
                    <p className="font-semibold">Doctor ID: {doctorInfo.id}</p>
                    <p className="font-semibold">Doctor Name: {doctorInfo.name}</p>
                </div>
            )}
        </div>
        {loading ? (
            <p className="text-center mt-4">Loading...</p>
        ) : (
            appointments.length === 0 ? (
                <p className="text-center">No appointments booked yet.</p>
            ) : (
                <ul>
                    {appointments.map((appointment, index) => (
                        <li key={index} className="border-b border-gray-300 py-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Patient ID: {appointment.patientId}</p>
                                    <p className="font-semibold">Time Slot: {new Date(appointment.timeSlot).toLocaleString()}</p>
                                </div>
                                <span className="text-green-600">Confirmed</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )
        )}
    </div>
);

};

export default Bookings;
