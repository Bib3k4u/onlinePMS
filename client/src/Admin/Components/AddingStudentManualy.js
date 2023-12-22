import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
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
    <div>
      <h2>Add Student Manually</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enrollment Number:
          <input
            type="text"
            name="enrollmentNumber"
            value={studentData.enrollmentNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Admission Number:
          <input
            type="text"
            name="admissionNumber"
            value={studentData.admissionNumber}
            onChange={handleChange}
          />
        </label>

        {/* Repeat similar input fields for other properties */}
        <label>
          Name:
          <input
            type="text"
            name="nameOfStudent"
            value={studentData.nameOfStudent}
            onChange={handleChange}
          />
        </label>
        <label>
        year
          <input
            type="number"
            name="year"
            value={studentData.year}
            onChange={handleChange}
          />
        </label>

        <label>
        branch
          <input
            type="text"
            name="branch"
            value={studentData.branch}
            onChange={handleChange}
          />
          
        </label>

        <label>
        semester
          <input
            type="number"
            name="semester"
            value={studentData.semester}
            onChange={handleChange}
          />
        </label>

        <label>
        contact
          <input
            type="text"
            name="contact"
            value={studentData.contact}
            onChange={handleChange}
          />
        </label>


        <label>
        email
          <input
            type="text"
            name="email"
            value={studentData.email}
            onChange={handleChange}
          />
        </label>

        <label>
        projectId
          <input
            type="text"
            name="projectId"
            value={studentData.projectId}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddingStudentManually;
