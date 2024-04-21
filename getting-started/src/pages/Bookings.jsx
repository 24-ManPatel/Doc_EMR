import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://65.0.8.212:4269/get_appointments');
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-semibold text-center">Upcoming Bookings</h1>
      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <div className="mt-4">
          {appointments.length === 0 ? (
            <p className="text-center">No appointments booked yet.</p>
          ) : (
            <ul>
              {appointments.map((appointment, index) => (
                <li key={index} className="border-b border-gray-300 py-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">Doctor ID: {appointment.doctorId}</p>
                      <p className="font-semibold">Patient ID: {appointment.patientId}</p>
                      <p className="font-semibold">Time Slot: {new Date(appointment.timeSlot).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600">Confirmed</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookings;
