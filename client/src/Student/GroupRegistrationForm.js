import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import StudentNav from './Components/StudentNav';
import { Verification2 } from './Verification2';
import { Verification } from './Verification';

const App = () => {
  const [enrollmentOptions, setEnrollmentOptions] = useState([]);
  const [selectedEnrollment1, setSelectedEnrollment1] = useState('');
  const [studentDetails1, setStudentDetails1] = useState(null);
  const [selectedEnrollment2, setSelectedEnrollment2] = useState('');
  const [studentDetails2, setStudentDetails2] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEnrollmentOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/enrollmentNumbers`);
        const options = response.data.map((enrollment) => ({
          label: enrollment,
          value: enrollment,
        }));
        setEnrollmentOptions(options);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching enrollment numbers:', error);
      }
    };

    fetchEnrollmentOptions();
  }, []);

  const handleEnrollmentChange1 = async (selectedOption) => {
    try {
      if (selectedOption && selectedOption.value !== selectedEnrollment2) {
        setSelectedEnrollment1(selectedOption.value);
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/studentDetails/${selectedOption.value}`);
        setStudentDetails1(response.data);
        setLoading(false);
      } else if (selectedOption) {
        alert('Please select a different enrollment number for Student 1.');
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleEnrollmentChange2 = async (selectedOption) => {
    try {
      if (selectedOption && selectedOption.value !== selectedEnrollment1) {
        setSelectedEnrollment2(selectedOption.value);
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/studentDetails/${selectedOption.value}`);
        setStudentDetails2(response.data);
        setLoading(false);
      } else if (selectedOption) {
        alert('Please select a different enrollment number for Student 2.');
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };



  return (
    <div className="h-auto min-h-screen flex flex-col md:flex-row items-center justify-center bg-color1 text-textColor">
      <StudentNav />
      <div className="w-full max-w-5xl cardShadow p-6 mt-20 rounded bg-cardColor text-black md:flex md:flex-wrap">
        <div className="md:w-1/2 md:pr-4 mb-8">
          <h1 className="text-2xl font-bold mb-4">Student 1 Registration</h1>
          {loading && <p>Loading Data...</p>}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Select Enrollment Number for Student 1:
            </label>
            <Select
              className="text-black"
              options={enrollmentOptions}
              value={enrollmentOptions.find(
                (option) => option.value === selectedEnrollment1
              )}
              onChange={handleEnrollmentChange1}
              isSearchable
            />
          </div>
          {studentDetails1 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Student 1 Details</h2>
              <p>Name: {studentDetails1.nameOfStudent}</p>
              <p>Enrollment Number: {studentDetails1.enrollmentNumber}</p>
              <p>Semester: {studentDetails1.semester}</p>
              <p>Branch: {studentDetails1.branch}</p>
              <p>Year: {studentDetails1.year}</p>
              <p>Contact: {studentDetails1.contact}</p>
              <p>Email: {studentDetails1.email}</p>
              <Verification studentDetails1={studentDetails1}/>
            </div>
          )}
        </div>

        <div className="md:w-1/2 md:pl-4">
          <h1 className="text-2xl font-bold mb-4">Student 2 Registration</h1>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Select Enrollment Number for Student 2:
            </label>
            <Select
              options={enrollmentOptions}
              value={enrollmentOptions.find(
                (option) => option.value === selectedEnrollment2
              )}
              onChange={handleEnrollmentChange2}
              isSearchable
            />
          </div>
          {studentDetails2 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Student 2 Details</h2>
              <p>Name: {studentDetails2.nameOfStudent}</p>
              <p>Enrollment Number: {studentDetails2.enrollmentNumber}</p>
              <p>Semester: {studentDetails2.semester}</p>
              <p>Branch: {studentDetails2.branch}</p>
              <p>Year: {studentDetails2.year}</p>
              <p>Contact: {studentDetails2.contact}</p>
              <p>Email: {studentDetails2.email}</p>
              <Verification2 studentDetails2={studentDetails2}/>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default App;



