import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const StudentRegistration = ({ onNumberOfMemberSelection, onprojectIdGeneration, studentDetails1 }) => {
  const [member, setMember] = useState(0);
  const [generatedProjectID, setGeneratedProjectID] = useState("");
  const [isclicked, setIsClicked] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const [lastprojectId, setLastProjectID] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(0);
  const [optionsSemester, setOptionsSemester] = useState([]);
  const [isCreateGroupDisabled, setIsCreateGroupDisabled] = useState(true);

  const optionsYear = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const handleButtonClick = (numberOfMembers) => {
    setMember(numberOfMembers);
    onNumberOfMemberSelection(numberOfMembers);
  };

  const handleClick = async () => {
    setIsClicked(true);

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

  useEffect(() => {
    // This useEffect will run whenever lastprojectId changes
    const generateProjectId = () => {
      const code = "BT" + selectedYear + selectedSemester + (parseInt(lastprojectId.substring(4, lastprojectId.length)) + 1);
      setGeneratedProjectID(code);
      onprojectIdGeneration(code);
       
      // console.log(response);
    };

    generateProjectId();
  }, [lastprojectId, selectedYear, selectedSemester]);

  return (
    <div className="w-full min-w-xl mx-auto p-6 bg-cardColor cardShadow shadow-md rounded-md">
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

      <div className='flex justify-center'>
      <button
      
      onClick={handleClick}
      className={`mt-4 bg-button buttonShadow text-white rounded-md px-4 py-2 hover:bg-hoverButton tracking-wider transition duration-300 ${isCreateGroupDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isCreateGroupDisabled}
    >
      Create Group
    </button>
      </div>

      {isclicked && (
        <div className="mt-4 flex flex-col justify-center">
          <h2 className="text-lg flex justify-center font-semibold mb-4 text-bgColor tracking-wider">Select the number of members in the group</h2>
          <div className="gap-5 flex justify-center">
            {[1, 2, 3, 4, 5].map((number) => (
              <button
                key={number}
                onClick={() => handleButtonClick(number)}
                className="rounded-full w-12  bg-bgColor text-textColor p-3 hover:bg-hoverButton transition duration-300"
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}

      <h2 className="mt-4 text-center text-lg">This is your Generated ProjectID : <span className='font-bold'>{generatedProjectID}</span></h2>
    </div>
  );
};

export default StudentRegistration;
