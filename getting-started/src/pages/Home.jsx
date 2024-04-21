import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await axios.get(`http://65.0.8.212:4269/patients/${patientId}`);
      //const response = await axios.get(`http://localhost:8000/patients/${patientId}`);

      setIsLoading(false);
      toast.success('Patient record found!');

      console.log('Patient details:', response.data);

      try {
        navigate(`/patient-details/${patientId}`, { state: { patientData: response.data } });
      } catch (error) {
        console.error('navigate ka locha mara :', error);
        toast.error('page problem hai bhai.');
      }
      navigate('/newVisit');
    } catch (error) {
      console.error('teri api ka problem :', error);
      toast.error('Failed to find patient record.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">EMR Manager!!</h1>
        <p className="text-lg mb-6 text-center text-gray-700">Manage electronic medical records efficiently.</p>

        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-900">Search Patient Record by ID</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="patientId" className="block text-gray-700 font-semibold">Patient ID:</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md p-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter patient ID"
                disabled={isLoading}
              />
            </div>
            <div className="text-center">
              <button type="submit" disabled={isLoading}
                      className="mt-4 bg-indigo-600 font-bold text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">
                {isLoading ? 'Searching...' : 'Search Record'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
