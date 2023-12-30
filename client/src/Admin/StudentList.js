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
      if (!file) {
        toast.error('Please choose a file before uploading.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
  
      setLoading(true);
  
      const formData = new FormData();
      formData.append('file', file);
  
      await axios.post('http://localhost:3001/sdUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('File uploaded successfully', {
        position: 'top-right',
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

      toast.success('Student added successfully', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });


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
      <div className="max-w-md mx-auto mt-20 p-6 bg-cardColor cardShadow rounded-md shadow-md">
        <h2 className="text-2xl bg-color1 text-black font-semibold mb-4">Upload Student List</h2>

        {/* File Input */}
        <div className="mb-4">
          <label htmlFor="fileInput" className="bg-color1 text-black block text-sm font-medium text-color3">
            Choose Excel File (.xlsx)
          </label>
          <input
    type="file"
    id="fileInput"
    required  // <-- Remove "true" from here
    accept=".xlsx"
    cursor="pointer"
    className="bg-color1 text-black cursor-pointer p-2 w-full"
    onChange={handleFileChange}
    title="Please choose an Excel file (.xlsx)"  // <-- Add a title attribute for more clarity
  />
        </div>

        {/* Show and Upload Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-button buttonShadow text-textColor hover:bg-hoverButton w-full rounded-md shadow-lg hover:shadow-2xl px-4 py-2"
            onClick={handleUploadClick}
          >
            {loading ? 'Uploading...' : 'Upload to Database'}
          </button>
        </div>
      </div>
      
      <div className='flex m-10 justify-center items-center'>
  <div className='flex-1'>
    <div style={{ height: '2px' }} className='bg-gray-300'></div>
  </div>
  
  <div className='flex-0 ml-4 mr-4 font-bold'>
    <h2>Or</h2>
  </div>
  
  <div className='flex-1'>
    <div style={{ height: '2px' }} className='bg-gray-300'></div>
  </div>
</div>



      <AddingStudentManually onStudentAdded={handleStudentAdded} />

      {/* Rest of your component */}
      <FetchedStudentData />
    </>
  );
};

export default StudentList;
