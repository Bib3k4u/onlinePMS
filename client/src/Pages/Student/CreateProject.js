import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Layouts from '../../Layouts/Layouts';
// { onNumberOfMemberSelection, onprojectIdGeneration, studentDetails1 }
const CreateProject = () => {
  const [member, setMember] = useState(0);
  const [generatedProjectID, setGeneratedProjectID] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);
  const [lastprojectId, setLastProjectID] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(0);
  const [optionsSemester, setOptionsSemester] = useState([]);
  const [isCreateGroupDisabled, setIsCreateGroupDisabled] = useState(true);
  const[addclass,setClass] = useState("")
  const optionsYear = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const handleButtonClick = (numberOfMembers) => {
    setMember(numberOfMembers);
    setClass('bg-gray-500')
    // onNumberOfMemberSelection(numberOfMembers);
  };

  const handleClick = async () => {
    // setIsClicked(true);

    try {
      const response = await axios.get(`http://localhost:3001/projectsData/${"BT" + selectedYear}`);
      setLastProjectID(response.data[0].projectId);
    } catch (error) {
      console.error("Error fetching project data:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    // This useEffect will run whenever selectedYear or selectedSemester changes
    let visibleSemesters = [];
    let isYearSelected = false;
  
    // Check if year is selected
    if (selectedYear > 0) {
      isYearSelected = true;
  
      // Set visible semesters based on the selected year
      if (selectedYear === 1) {
        visibleSemesters = [1, 2];
      } else if (selectedYear === 2) {
        visibleSemesters = [3, 4];
      } else if (selectedYear === 3) {
        visibleSemesters = [5, 6];
      } else if (selectedYear === 4) {
        visibleSemesters = [7, 8];
      }
    }
  
    setOptionsSemester(
      visibleSemesters.map((semester) => ({ value: semester, label: semester.toString() }))
    );
  
    // Reset selected semester when year changes
    if (!isYearSelected) {
      setSelectedSemester(0);
    }
  
    // Disable "Create Group" button if either year or semester is not selected
    setIsCreateGroupDisabled(!isYearSelected || selectedSemester === 0);
  
  }, [selectedYear, selectedSemester]);


  return (
    <Layouts >
        <div className='w-full h-screen flex justify-center items-center'>
    <div className="w-5/6 min-w-xl mx-auto p-6 bg-white border-4 border-gray-200 upDown shadow-md rounded-md">
      <label className="block text-sm font-semibold mb-2">Select Year:</label>
      <Select
        className="text-black w-full"
        options={optionsYear}
        value={optionsYear.find((option) => option.value === selectedYear)}
        onChange={(selectedOption) => setSelectedYear(selectedOption.value)}
        isSearchable={false}  // Disable typing input
      />

      <label className="block text-sm font-semibold mb-2 mt-4">Select Semester:</label>
      <Select
        className="text-black w-full"
        options={optionsSemester}
        value={optionsSemester.find((option) => option.value === selectedSemester)}
        onChange={(selectedOption) => setSelectedSemester(selectedOption.value)}
        isSearchable={false}  // Disable typing input
      />
      <div className='flex flex-col w-full'>
            <label className="block text-sm font-semibold mb-2 mt-4">Leader Admission Number:</label>
            <input className='outline-none border p-2 border-gray-300' type='text' name='admission' placeholder='20SCSE110xx' value={admissionNumber} onChange={(e)=>setAdmissionNumber(e.target.value)}/>
        </div>
<div className="mt-4 flex flex-col justify-center">
          <h2 className="text-lg flex justify-center font-semibold mb-4 text-black tracking-wider">Select the number of members in the group</h2>
          <div className="gap-5 flex justify-center">
            {[1, 2, 3, 4, 5].map((number) => (
              <button
                key={number}
                onClick={() => handleButtonClick(number)}
                className={`${addclass} rounded-full w-12  bg-bgBlueDark hover:scale-110 text-textColor p-3 hover:bg-hoverButton transition duration-300`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
        
      <div className='flex justify-center'>
      <button
      
      onClick={handleClick}
      className={`mt-4 bg-button buttonShadow text-white rounded-md px-4 py-2 hover:bg-hoverButton tracking-wider transition duration-300 ${isCreateGroupDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isCreateGroupDisabled}
    >
      Create Group
    </button>
      </div>
{/* 
      {isclicked && (
        
      )} */}

    </div>
    </div>
    </Layouts>
  );
};

export default CreateProject;