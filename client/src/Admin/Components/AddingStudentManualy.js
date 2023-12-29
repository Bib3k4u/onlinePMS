import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

function AddingStudentManually() {
  const [studentData, setStudentData] = useState({
    enrollmentNumber: '',
    admissionNumber: '',
    nameOfStudent: '',
    branch: '',
    year: null,
    semester: null,
    contact: '',
    email: '',
    projectId: '',
    isYearSelected: false,
    visibleSemesters: [],
  });

  const optionsYear = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ];

  const optionsSemester = studentData.visibleSemesters.map((sem) => ({
    value: sem,
    label: sem.toString(),
  }));

  const handleChange = (value, field) => {
    let isYearSelected = false;
    let visibleSemesters = [];

    if (field === 'year') {
      isYearSelected = true;

      if (value === 1) {
        visibleSemesters = [1, 2];
      } else if (value === 2) {
        visibleSemesters = [3, 4];
      } else if (value === 3) {
        visibleSemesters = [5, 6];
      } else if (value === 4) {
        visibleSemesters = [7, 8];
      }

      setStudentData((prevData) => ({
        ...prevData,
        [field]: value,
        isYearSelected,
        visibleSemesters,
        semester: null,
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to save the student data
      await axios.post('http://localhost:3001/sdUpload', studentData);
      toast.success('Student added successfully!');
      setStudentData({
        enrollmentNumber: '',
        admissionNumber: '',
        nameOfStudent: '',
        branch: '',
        year: null,
        semester: null,
        contact: '',
        email: '',
        projectId: '',
        isYearSelected: false,
        visibleSemesters: [],
      });
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Error adding student. Please try again.');
    }
  };

  const branchOptions = [
    { value: 'CSE', label: 'CSE' },
    { value: 'BCA', label: 'BCA' },
    { value: 'MCA', label: 'MCA' },
    { value: 'MTECH', label: 'MTECH' },
  ];

  return (
    <div className="container mx-auto mt-8 bg-cardColor text-black cardShadow rounded-md">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-2xl font-bold pt-2 mb-4 flex justify-center">Add Student Manually</h2>
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row justify-around'>
          <label className="block mb-4">
            <span className="text-gray-700">Enrollment Number:</span>
            <input
              type="text"
              required
              name="enrollmentNumber"
              value={studentData.enrollmentNumber}
              onChange={(e) => handleChange(e.target.value, 'enrollmentNumber')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Admission Number:</span>
            <input
              type="text"
              required
              name="admissionNumber"
              value={studentData.admissionNumber}
              onChange={(e) => handleChange(e.target.value, 'admissionNumber')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              required
              name="nameOfStudent"
              value={studentData.nameOfStudent}
              onChange={(e) => handleChange(e.target.value, 'nameOfStudent')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          <label className="block mb-4 ">
            <span className="text-gray-700">Year:</span>
            <Select
              required
              className="text-black w-60 border-gray-400"
              options={optionsYear}
              value={optionsYear.find((option) => option.value === studentData.year)}
              onChange={(selectedOption) => handleChange(selectedOption.value, 'year')}
              isSearchable={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: '42px',
                  outline: state.isFocused ? '2px solid black' : 'none',
                  borderRadius: '7px',
                  marginTop: '4px'
                }),
              }}
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Semester:</span>
            <Select
              required
              className="text-black w-60"
              options={optionsSemester}
              value={optionsSemester.find((option) => option.value === studentData.semester)}
              onChange={(selectedOption) => handleChange(selectedOption.value, 'semester')}
              isSearchable={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: '42px',
                  outline: state.isFocused ? '2px solid black' : 'none',
                  borderRadius: '7px',
                  marginTop: '4px'
                }),
              }}
            />
          </label>
        </div>

        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row justify-around'>
          <label className="block mb-4 w-60">
            <span className="text-gray-700">Branch:</span>
            <Select
              required
              className="text-black w-full"
              options={branchOptions}
              value={branchOptions.find((option) => option.value === studentData.branch)}
              onChange={(selectedOption) => handleChange(selectedOption.value, 'branch')}
              isSearchable={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: '42px',
                  outline: state.isFocused ? '2px solid black' : 'none',
                  borderRadius: '7px',
                  marginTop: '4px'
                }),
              }}
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Contact:</span>
            <input
              required
              type="text"
              name="contact"
              value={studentData.contact}
              onChange={(e) => handleChange(e.target.value, 'contact')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Email:</span>
            <input
              required
              type="text"
              name="email"
              value={studentData.email}
              onChange={(e) => handleChange(e.target.value, 'email')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Project ID:</span>
            <input
              required
              type="text"
              name="projectId"
              value={studentData.projectId}
              onChange={(e) => handleChange(e.target.value, 'projectId')}
              className="form-input mt-1 p-2 border rounded-md border-gray-300 block w-full"
            />
          </label>

          <label className="flex justify-center items-center">
            <span className="text-gray-700"></span>
            <button
              type="submit"
              className="bg-button mb-4 text-textColor buttonShadow hover:bg-hoverButton font-semibold tracking-wider mt-1 w-60 h-12 rounded-md"
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
