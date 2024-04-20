import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialComplaints = [
  { id: 1, complaint: '', frequency: '', severity: '', duration: '', date: '' }
];

export default function NewVisit() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const navigate = useNavigate();

  const handleComplaintChange = (index, field, value) => {
    const newComplaints = complaints.map((complaint, i) => {
      if (i === index) {
        return { ...complaint, [field]: value };
      }
      return complaint;
    });
    setComplaints(newComplaints);
  };

  const addComplaintRow = () => {
    setComplaints([...complaints, { id: complaints.length + 1, complaint: '', frequency: '', severity: '', duration: '', date: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process submission here
    // navigate('/next-page');
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <table className="min-w-full table-auto bg-white rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Complaints</th>
              <th className="px-4 py-2">Frequency</th>
              <th className="px-4 py-2">Severity</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={complaint.id} className="text-center">
                <td className="border px-4 py-2">{complaint.id}</td>
                <td className="border px-4 py-2">
                  <select
                    className="w-full border bg-white rounded px-3 py-2 outline-none"
                    value={complaint.complaint}
                    onChange={(e) => handleComplaintChange(index, 'complaint', e.target.value)}
                  >
                    <option value="">Select Complaint</option>
                    <option value="fever">Fever</option>
                    <option value="cough">Cough</option>
                    {/* Add more options here */}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  {/* Add select for Frequency */}
                </td>
                <td className="border px-4 py-2">
                  {/* Add select for Severity */}
                </td>
                <td className="border px-4 py-2">
                  {/* Add select for Duration */}
                </td>
                <td className="border px-4 py-2">
                  {/* Add input for Date */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addComplaintRow}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Complaint
          </button>
          <button
            type="submit"
            className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
}
