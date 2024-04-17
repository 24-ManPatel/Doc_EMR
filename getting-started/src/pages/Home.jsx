import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">EMR Manager!!</h1>
        <p className="text-lg mb-6 text-center text-gray-700">Here you can manage electronic medical records efficiently.</p>

        <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-900">Search Patient Record</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold">Patient Name:</label>
                    <input type="text" id="name" name="name"
                           className="mt-1 block w-full border-2 border-gray-300 rounded-md p-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                           placeholder="Enter patient name" />
                </div>
                <div>
                    <label htmlFor="dob" className="block text-gray-700 font-semibold">Date of Birth:</label>
                    <input type="date" id="dob" name="dob"
                           className="mt-1 block w-full border-2 border-gray-300 rounded-md p-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                    <label htmlFor="gender" className="block text-gray-700 font-semibold">Gender:</label>
                    <select id="gender" name="gender"
                            className="mt-1 block w-full border-2 border-gray-300 rounded-md p-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="text-center">
                    <button type="submit"
                            className="mt-4 bg-indigo-600 font-bold fontsize-14 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">
                        Search Record
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>



  )
}
