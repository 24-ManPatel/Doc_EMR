import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PastRecords = () => {
  const [visits, setVisits] = useState([]);
  const location = useLocation();
  const patientId = new URLSearchParams(location.search).get('patientId');

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await axios.get(`http://65.0.8.212:4269/pastRecordsapi?patientId=${patientId}`);
        //const response = await axios.get(`http://localhost:8000/pastRecordsapi?patientId=${patientId}`);
        setVisits(response.data);
      } catch (error) {
        console.error('Error fetching past visits:', error);
      }
    };

    fetchVisits();
  }, [patientId]);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-semibold text-center">Past Patient Records</h1>
      {visits.map((visit, index) => (
        <div key={index} className="mb-8">
          <div className="border-b-2 border-gray-200 mb-4">
            <p className="text-gray-600 text-sm">{new Date(visit.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Visit {index + 1}</h2>
            <div className="flex justify-between mb-4">
              <div>
                <p><span className="font-semibold">Patient ID:</span> {visit.patientId}</p>
                <p><span className="font-semibold">Doctor ID:</span> {visit.doctorId}</p>
              </div>
              <div>
                <p><span className="font-semibold">Height:</span> {visit.height}</p>
                <p><span className="font-semibold">Weight:</span> {visit.weight}</p>
              </div>
            </div>
            <div className="mb-4">
              <p><span className="font-semibold">Pulse:</span> {visit.pulse}</p>
              <p><span className="font-semibold">Blood Pressure:</span> {visit.bp} / {visit.mmHg}</p>
              <p><span className="font-semibold">Temperature:</span> {visit.temperature}</p>
            </div>
            <div className="flex">
              <div className="w-1/3 pr-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Complaints</h3>
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Frequency</th>
                        <th className="px-4 py-2">Severity</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visit.complaints.map((complaint, i) => (
                        <tr key={i}>
                          <td className="border px-4 py-2">{complaint.complaintName}</td>
                          <td className="border px-4 py-2">{complaint.frequency}</td>
                          <td className="border px-4 py-2">{complaint.severity}</td>
                          <td className="border px-4 py-2">{complaint.duration}</td>
                          <td className="border px-4 py-2">{complaint.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Diagnosis</h3>
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Diagnosis Name</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visit.diagnosis.map((diagnosis, i) => (
                        <tr key={i}>
                          <td className="border px-4 py-2">{diagnosis.diagnosisName}</td>
                          <td className="border px-4 py-2">{diagnosis.duration}</td>
                          <td className="border px-4 py-2">{diagnosis.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-1/3 pr-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Medicine</h3>
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Medicine Name</th>
                        <th className="px-4 py-2">Dose</th>
                        <th className="px-4 py-2">When</th>
                        <th className="px-4 py-2">Frequency</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visit.medicine.map((medicine, i) => (
                        <tr key={i}>
                          <td className="border px-4 py-2">{medicine.medicineName}</td>
                          <td className="border px-4 py-2">{medicine.dose}</td>
                          <td className="border px-4 py-2">{medicine.when}</td>
                          <td className="border px-4 py-2">{medicine.frequency}</td>
                          <td className="border px-4 py-2">{medicine.duration}</td>
                          <td className="border px-4 py-2">{medicine.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-1/3">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Tests</h3>
                  <table className="table-auto">
                    <tbody>
                      {visit.tests.map((test, i) => (
                        <tr key={i}>
                          <td className="border px-48 py-2">{test}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  
};

export default PastRecords;
