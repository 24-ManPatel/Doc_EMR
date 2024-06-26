import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const initialComplaints = [
  { id: 1, complaintName: '', frequency: '', severity: '', duration: '', date: '' }
];


const initialMedications = [
  { id: 1, medicineName: '', dose: '', when: '', frequency: '', duration: '', notes: '' }
];
const TestDropdown = ({ options, onSelect }) => {
  return (

    <div className="absolute mt-1 z-10 w-2/3 bg-white rounded-md shadow-lg">
      {options.map((option, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(option)}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default function NewVisit() {
  const [appointmentId, setAppointmentId] = useState('');
  const [complaints, setComplaints] = useState(initialComplaints);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access location state
  const { patientData, doctorName, doctorId } = location.state || {}; // Extract patient data

  useEffect(() => {
    const generateAppointmentId = () => {
      const id = Math.floor(Math.random() * 90000000) + 10000000; // Generates a number between 10000000 and 99999999
      setAppointmentId(id.toString());
    };

    generateAppointmentId();
  }, []);

  useEffect(() => {
    if (!patientData) {
      // Redirect to home if patient data is not available
      navigate('/home');
      toast.error('Patient data not found.');
    }
  }, [patientData, navigate]);


  const diagnosisOptions = ['Viral Fever', 'AIDS', 'Cancer', 'Hypertension'];
  const durationOptions = ['1 day', '1 week', '1 month', '6 months', '1 year'];

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTest, setSelectedTest] = useState('');
  const dropdownRef = useRef();
  const [diagnoses, setDiagnoses] = useState([
    { id: 1, diagnosisName: '', duration: '', date: '' }
  ]);

  const handleComplaintChange = (index, field, value) => {
    const newComplaints = complaints.map((complaint, i) => {
      if (i === index) {
        // Ensure the correct field key is used for complaint name
        const key = field === 'complaint' ? 'complaintName' : field;
        return { ...complaint, [key]: value };
      }
      return complaint;
    });
    setComplaints(newComplaints);
  };


  const handleDiagnosisChange = (index, field, value) => {
    const updatedDiagnoses = diagnoses.map((diagnosis, i) => {
      if (i === index) {
        const key = field === 'diagnosis' ? 'diagnosisName' : field;
        return { ...diagnosis, [key]: value };
      }
      return diagnosis;
    });
    setDiagnoses(updatedDiagnoses);
  };

  const addDiagnosisRow = () => {
    setDiagnoses([
      ...diagnoses,
      { id: diagnoses.length + 1, diagnosisName: '', duration: '', date: '' }
    ]);
  };


  const addComplaintRow = () => {
    setComplaints([
      ...complaints,
      { id: complaints.length + 1, complaintName: '', frequency: '', severity: '', duration: '', date: '' }
    ]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const visitData = {
        appointmentId,
        patientId: patientData.PatientId, // Make sure patientData is structured correctly
        doctorId: doctorId, // This should be dynamically set based on logged-in user
        height: document.getElementById('height').value + ' cm',
        weight: document.getElementById('weight').value + ' kg',
        pulse: document.getElementById('pulse').value + ' bpm',
        bp: document.getElementById('bp-systolic').value,
        mmHg: document.getElementById('bp-diastolic').value,
        temperature: document.getElementById('temperature').value + '°F',
        complaints,
        diagnosis: diagnoses,
        medicine: medications,
        tests: [selectedTest] // Assuming selectedTest holds the last selected test or an array of tests
      };

      // Post request to server
      const response = await axios.post('/newVisit', visitData);

      if (response.status === 201) {
        toast.success('Visit record added successfully');
        navigate('/home'); // Redirect or handle next steps
      } else {
        toast.error('Failed to add visit record');
      }
    } catch (error) {
      console.error('Failed to submit visit data:', error);
      toast.error('Error submitting visit data');
    }
  };



  const tests = [
    'LFT',
    'Liver Fitness Test',
    'Total Blood Count',
    'TSH',
    'T3',
    'Sugar Random',
    'Sugar Fasting',
    // ...more tests
  ];

  const handleSelectTest = (test) => {
    setSelectedTest(test);
    setShowDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);



  const whenOptions = ['Morning', 'Noon', 'Evening', 'Night', 'Before Lunch', 'After Lunch'];
  const medicineOptions = ['NOVOMIX 30 IU', 'UDAPA 10MG', 'ISTAMET 50/1000', 'STAMLO 5MG']; // ...more meds

  const [medications, setMedications] = useState(initialMedications);

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = medications.map((medication, i) => {
      if (i === index) {
        const key = field === 'medicine' ? 'medicineName' : field;
        return { ...medication, [key]: value };
      }
      return medication;
    });
    setMedications(updatedMedications);
  };


  const addMedicationRow = () => {
    setMedications([
      ...medications,
      { id: medications.length + 1, medicineName: '', dose: '', when: '', frequency: '', duration: '', notes: '' }
    ]);
  };


  const handlePastRecordsClick = () => {
    navigate(`/pastRecords?patientId=${patientData.PatientId}`); // Navigating to pastRecords with patientId as query parameter
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
    <div className="mx-auto px-4 ref={dropdownRef}">
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
      <div className="text-lg font-bold py-2">
        Appointment ID: {appointmentId}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          <button
            onClick={handlePastRecordsClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          >
            Past Patient Records
          </button>
          {/* ... other header elements ... */}
          {/* Doctor details */}

          <h2 className="text-2xl font-bold mb-4">Doctor Details</h2>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Doctor Name: {doctorName}</span>
            <span className="text-lg font-semibold">Doctor ID: {doctorId}</span>
          </div>

        </div>
        <div className="mb-6">
          {/* Patient Data Section */}
          <h2 className="text-2xl font-bold mb-4">Patient Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-600 mb-2">Name:</label>
              <span className="text-lg font-semibold">{patientData.PatientName}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="age" className="text-gray-600 mb-2">Age:</label>
              <span className="text-lg font-semibold">{patientData.Age}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-gray-600 mb-2">Gender:</label>
              <span className="text-lg font-semibold">{patientData.Sex}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-gray-600 mb-2">Patient ID:</label>
              <span className="text-lg font-semibold">{patientData.PatientId}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <br />
          <h2 className="text-xl font-semibold mb-4">Vitals</h2>
          <div className="flex flex-wrap -mx-2">
            <div className="flex flex-wrap w-1/2 px-2">
              <div className="flex items-center space-x-2 mb-4 w-full">
                <label htmlFor="height" className="w-1/3">Height</label>
                <input type="number" min={10} id="height" className="border-2 border-gray-300 rounded-md p-2 text-center w-1/3" placeholder="166" />
                <span className="text-sm">cm</span>
              </div>
              <div className="flex items-center space-x-2 mb-4 w-full">
                <label htmlFor="weight" className="w-1/3">Weight</label>
                <input type="number" min={10} id="weight" className="border-2 border-gray-300 rounded-md p-2 text-center w-1/3" placeholder="72" />
                <span className="text-sm">kg</span>
              </div>
              <div className="flex items-center space-x-2 mb-4 w-full">
                <label htmlFor="pulse" className="w-1/3">Pulse</label>
                <input type="number" id="pulse" min={5} className="border-2 border-gray-300 rounded-md p-2 text-center w-1/3" placeholder="Pulse" />
                <span className="text-sm">bpm</span>
              </div>
            </div>
            <div className="flex flex-wrap w-1/2 px-2">
              <div className="flex items-center space-x-2 mb-4 w-full">
                <label htmlFor="bp-systolic" className="w-1/3">BP</label>
                <input type="number" id="bp-systolic" className="border-2 border-gray-300 rounded-md p-2 text-center w-1/4" placeholder="120" />
                <span className="text-sm">/</span>
                <input type="number" id="bp-diastolic" className="border-2 border-gray-300 rounded-md p-2 text-center w-1/4" placeholder="80" />
                <span className="text-sm">mmHg</span>
              </div>
              <div className="flex items-center space-x-2 mb-4 w-full">
                <label htmlFor="temperature" className="w-1/3">Temperature</label>
                <input type="number" min={90} id="temperature" className="border-2 border-gray-300 rounded-md p-2 text-center w-1/3" placeholder="98.6" />
                <span className="text-sm">F</span>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">Complaints</h2>
        <table className="min-w-full table-fixed bg-white rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="w-12 px-4 py-2">#</th>
              <th className="px-4 py-2">Complaints</th>
              <th className="px-4 py-2">Frequency</th>
              <th className="px-4 py-2">Severity</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={complaint.id} className="text-center border-b">
                <td className="border px-4 py-2">{complaint.id}</td>
                <td className="border px-4 py-2">
                  <select
                    className="w-full px-3 py-2 outline-none border-0"
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
                  <select
                    className="w-full px-3 py-2 outline-none border-0"
                    value={complaint.frequency}
                    onChange={(e) => handleComplaintChange(index, 'frequency', e.target.value)}
                  >
                    <option value="">Select Frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    {/* Add more options here */}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="w-full px-3 py-2 outline-none border-0"
                    value={complaint.severity}
                    onChange={(e) => handleComplaintChange(index, 'severity', e.target.value)}
                  >
                    <option value="">Select Severity</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    {/* Add more options here */}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="w-full px-3 py-2 outline-none border-0"
                    value={complaint.duration}
                    onChange={(e) => handleComplaintChange(index, 'duration', e.target.value)}
                  >
                    <option value="">Select Duration</option>
                    <option value="1_day">1 Day</option>
                    <option value="1_week">1 Week</option>
                    {/* Add more options here */}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    className="w-full px-3 py-2 outline-none border-0"
                    value={complaint.date}
                    onChange={(e) => handleComplaintChange(index, 'date', e.target.value)}
                  />
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
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Diagnosis</h3>
          <table className="min-w-full table-fixed bg-white rounded-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="w-12 px-4 py-2">#</th>
                <th className="px-4 py-2">Diagnosis</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {diagnoses.map((diagnosis, index) => (
                <tr key={diagnosis.id} className="text-center border-b">
                  <td className="border px-4 py-2">{diagnosis.id}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full px-3 py-2 outline-none border-0"
                      value={diagnosis.diagnosis}
                      onChange={(e) => handleDiagnosisChange(index, 'diagnosis', e.target.value)}
                    >
                      <option value="">Select Diagnosis</option>
                      {diagnosisOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full px-3 py-2 outline-none border-0"
                      value={diagnosis.duration}
                      onChange={(e) => handleDiagnosisChange(index, 'duration', e.target.value)}
                    >
                      <option value="">Select Duration</option>
                      {durationOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="date"
                      className="w-full px-3 py-2 outline-none border-0"
                      value={diagnosis.date}
                      onChange={(e) => handleDiagnosisChange(index, 'date', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={addDiagnosisRow}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Diagnosis
            </button>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Medicine</h3>
        <table className="min-w-full table-fixed bg-white rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="w-12 px-4 py-2">#</th>
              <th className="px-4 py-2">Medicine</th>
              <th className="px-4 py-2">Dose</th>
              <th className="px-4 py-2">When</th>
              <th className="px-4 py-2">Frequency</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Notes / Instructions</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication, index) => (
              <tr key={medication.id} className="text-center border-b">
                <td className="border px-4 py-2">{medication.id}</td>
                <td className="border px-4 py-2">
                  <select
                    className="w-full px-3 py-2 outline-none border-0"
                    value={medication.medicine}
                    onChange={(e) => handleMedicationChange(index, 'medicine', e.target.value)}
                  >
                    <option value="">Select Medicine</option>
                    {medicineOptions.map((med, idx) => (
                      <option key={idx} value={med}>{med}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 outline-none border-0"
                    value={medication.dose}
                    onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="w-full px-3 py-2 outline-none border-0"
                    value={medication.when}
                    onChange={(e) => handleMedicationChange(index, 'when', e.target.value)}
                  >
                    <option value="">Select Time</option>
                    {whenOptions.map((when, idx) => (
                      <option key={idx} value={when}>{when}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 outline-none border-0"
                    value={medication.frequency}
                    onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 outline-none border-0"
                    value={medication.duration}
                    onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                    placeholder="e.g., 10 days"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 outline-none border-0"
                    value={medication.notes}
                    onChange={(e) => handleMedicationChange(index, 'notes', e.target.value)}
                    placeholder="Enter instructions"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            type='button'
            onClick={addMedicationRow}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Medicine
          </button>
        </div>


        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold mb-2">Test Required</h3>
        </div>

        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Choose Test"
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="p-2 border-2 border-gray-300 rounded-md w-2/3"
          />
          {showDropdown && <TestDropdown options={tests} onSelect={handleSelectTest} />}
        </div>
        <br></br>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        <br /><br />
      </form>
    </div>

  );
}
