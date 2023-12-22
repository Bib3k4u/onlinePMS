import React from 'react';
import AdminNav from './Components/AdminNav';

const StudentList = () => {
  

  return (
    <>
      <AdminNav />
      <div className="max-w-md mx-auto mt-20 p-6 bg-color1 rounded-md shadow-md text-white">
        <h2 className="text-2xl font-semibold mb-4 text-black">Upload Student List</h2>

        {/* File Input */}
        <div className="mb-4">
          <label htmlFor="fileInput" className="block text-sm font-medium text-color3">
            Choose Excel File (.xlsx)
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".xlsx"
            cursor="pointer"
            className="mt-1 cursor-pointer p-2 rounded-md w-full bg-color2 text-color3"
          />
        </div>

        {/* Show and Upload Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-color3 hover:bg-color2 text-black px-4 py-2 rounded-md"
            onClick={() => {
              alert('Show button clicked');
            }}
          >
            Show
          </button>
          <button
            className="bg-color3 hover:bg-color2 text-black px-4 py-2 rounded-md"
            onClick={() => {
              alert('Upload to Database button clicked');
            }}
          >
            Upload to Database
          </button>
        </div>
      </div>


      <div className="w-full mx-auto mt-8">
        <table className="w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className='flex justify-around'>
              <th>Enrollment Number</th>
              <th>Admission Number</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Email</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default StudentList;
