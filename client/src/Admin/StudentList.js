import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from './Components/AdminNav';
import FetchedStudentData from './Components/FetchedStudentData';
import AddingStudentManually from './Components/AddingStudentManualy';

const StudentList = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadClick = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:3001/sdUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('File uploaded successfully', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading File', error);

      toast.error('Error uploading file. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStudentAdded = async (newStudentData) => {
    try {
      // Make a request to add the student to the database (modify this as needed)
      // await axios.post('http://localhost:3001/addStudent', newStudentData);

      // Assuming the request is successful, trigger a success toast
      toast.success('Student added successfully', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Automatically refetch data from the database after adding a student
      // Add your logic for fetching data here (modify this as needed)
      // await fetchData();

      console.log('Student added successfully');
    } catch (error) {
      console.error('Error adding student', error);

      toast.error('Error adding student. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <AdminNav />
      <div className="max-w-md mx-auto mt-20 p-6 bg-color1 rounded-md shadow-md">
        <h2 className="text-2xl bg-color1 text-black font-semibold mb-4">Upload Student List</h2>

        {/* File Input */}
        <div className="mb-4">
          <label htmlFor="fileInput" className="bg-color1 text-black block text-sm font-medium text-color3">
            Choose Excel File (.xlsx)
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".xlsx"
            cursor="pointer"
            className="bg-color1 text-black cursor-pointer p-2 w-full"
            onChange={handleFileChange}
          />
        </div>

        {/* Show and Upload Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-[#4A4A4A] text-color1 hover:bg-gray-400 shadow-lg hover:shadow-2xl hover:text-black px-4 py-2 w-full"
            onClick={handleUploadClick}
          >
            {loading ? 'Uploading...' : 'Upload to Database'}
          </button>
        </div>
      </div>

      {/* Pass the handleStudentAdded function to the AddingStudentManually component */}
      <AddingStudentManually onStudentAdded={handleStudentAdded} />

      {/* Rest of your component */}
      <FetchedStudentData />
    </>
  );
};

export default StudentList;
