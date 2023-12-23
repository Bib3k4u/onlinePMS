import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddingStudentManually() {
  const [studentData, setStudentData] = useState({
    enrollmentNumber: '',
    admissionNumber: '',
    nameOfStudent: '',
    branch: '',
    year: '',
    semester: '',
    contact: '',
    email: '',
    projectId: '',
  });

  const [semesters, setSemesters] = useState([]);
  
  useEffect(() => {
    // Fetch semesters based on the selected year
    if (studentData.year) {
      // Assuming semesters are fetched from the server based on the selected year
      // Adjust the API endpoint or fetch logic based on your server implementation
      axios.get(`http://localhost:3001/semesters/${studentData.year}`)
        .then(response => {
          setSemesters(response.data);
        })
        .catch(error => {
          console.error('Error fetching semesters:', error);
        });
    } else {
      setSemesters([]);
    }
  }, [studentData.year]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    let validatedValue = value;
    if (name === 'enrollmentNumber' || name === 'year' || name === 'semester' || name === 'contact') {
      validatedValue = parseInt(value, 10); // Convert to integer
    }

    if (name === 'admissionNumber' || name === 'branch' || name === 'nameOfStudent' || name === 'email' || name === 'projectId') {
      // No specific validation for string fields
    }

    setStudentData((prevData) => ({
      ...prevData,
      [name]: validatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to save the student data
      await axios.post('http://localhost:3001/sdUpload', studentData);

      // Reset the form after successful submission
      setStudentData({
        enrollmentNumber: '',
        admissionNumber: '',
        nameOfStudent: '',
        branch: '',
        year: '',
        semester: '',
        contact: '',
        email: '',
        projectId: '',
      });

      // Optionally, you can add a success message or redirect the user
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Add Student Manually</h2>
      <form onSubmit={handleSubmit} className="w-full  mx-auto">
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row justify-around'>
        <label className="block mb-4">
          <span className="text-gray-700">Enrollment Number:</span>
          <input
            type="text"
            name="enrollmentNumber"
            value={studentData.enrollmentNumber}
            onChange={handleChange}
            className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Admission Number:</span>
          <input
            type="text"
            name="admissionNumber"
            value={studentData.admissionNumber}
            onChange={handleChange}
            className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="nameOfStudent"
            value={studentData.nameOfStudent}
            onChange={handleChange}
            className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
          />
        </label>

        <label className="block mb-4">
            <span className="text-gray-700">Year:</span>
            <input
              type="number"
              name="year"
              value={studentData.year}
              onChange={handleChange}
              className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
            />
          </label>

        <label className="block mb-4">
          <span className="text-gray-700">Branch:</span>
          <input
            type="text"
            name="branch"
            value={studentData.branch}
            onChange={handleChange}
            className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
          />
        </label>
        </div>

        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row justify-around'>
        <label className="block mb-4">
          <span className="text-gray-700">Semester:</span>
          <input
            type="number"
            name="semester"
            value={studentData.semester}
            onChange={handleChange}
            className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Contact:</span>
          <input
            type="text"
            name="contact"
            value={studentData.contact}
            onChange={handleChange}
            className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="text"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Project ID:</span>
          <input
            type="text"
            name="projectId"
            value={studentData.projectId}
            onChange={handleChange}
            className="form-input mt-1 p-2 border rounded-md border-gray-400 block w-full"
          />
        </label>

        <label className=" flex justify-center items-center">
        <span className="text-gray-700"></span>
        <button
          type="submit"
          className="bg-color1 text-black hover:bg-blue-400 font-bold mt-1 w-60 h-12   rounded-md  focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Add Student
        </button>
        </label>

        
        </div>
      </form>
    </div>
  );
}

export default AddingStudentManually;