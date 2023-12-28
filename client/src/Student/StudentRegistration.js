import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
const StudentRegistration = ({ onNumberOfMemberSelection, onprojectIdGeneration, studentDetails1 }) => {
  const [member, setMember] = useState(0);
  const [generatedProjectID, setGeneratedProjectID] = useState("");
  const [isclicked, setIsClicked] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const[lastprojectId,setLastProjectID] =  useState("");
  const[selectedSemester,setSelectedSemester]=useState(0);
  const optionsYear = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" }
  ];
const optionsSemester =[
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" }
]
  const handleButtonClick = (numberOfMembers) => {
    setMember(numberOfMembers);
    onNumberOfMemberSelection(numberOfMembers);
  };

 

  const handleClick = async () => {
    setIsClicked(true);
  
    try {
      const response = await axios.get(`http://localhost:3001/projectsData/${"BT" + selectedYear}`);
      setLastProjectID(response.data[0].projectId);
  
      // Assuming response.data is the last project ID, update the state
      // const code = "BT" +selectedYear+selectedSemester+(parseInt(lastprojectId.substring(4,lastprojectId.length))+1);
      // setGeneratedProjectID(code); // Pass an object similar to the expected Select option
  
  
    } catch (error) {
      console.error('Error fetching project data:', error);
      // Handle error as needed
    }
  };
  useEffect(() => {
    // This useEffect will run whenever lastprojectId changes
    const generateProjectId = () => {
      const code = "BT" +selectedYear+selectedSemester+(parseInt(lastprojectId.substring(4,lastprojectId.length))+1);
      setGeneratedProjectID(code);
      onprojectIdGeneration(code);
    };
  
    generateProjectId();
  }, [lastprojectId, selectedYear, selectedSemester]); 


  console.log(lastprojectId);
  console.log(generatedProjectID);
  return (
    <div>
       <label className="block text-sm font-semibold mb-2">
            Select Year:
          </label>
          <Select
            className="text-black"
            options={optionsYear}
            value={optionsYear.find((option) => option.value === selectedYear)}
            onChange={(selectedOption)=>setSelectedYear(selectedOption.value)}
          />
                <label className="block text-sm font-semibold mb-2">
            Select semester:
          </label>
            <Select
            className="text-black"
            options={optionsSemester}
            value={optionsSemester.find((option) => option.value === selectedSemester)}
            onChange={(selectedOption)=>setSelectedSemester(selectedOption.value)}
          />
     
      <button onClick={handleClick}>Create Group</button>
      {isclicked && (
        <div>
         
          <h2>Select the number of members in the group</h2>
          <div className='d-flex gap-5'>
            <button onClick={() => handleButtonClick(1)} className='rounded-full bg-red-200 p-2'>1</button>
            <button onClick={() => handleButtonClick(2)} className='rounded-full bg-red-200 p-2'>2</button>
            <button onClick={() => handleButtonClick(3)} className='rounded-full bg-red-200 p-2'>3</button>
            <button onClick={() => handleButtonClick(4)} className='rounded-full bg-red-200 p-2'>4</button>
            <button onClick={() => handleButtonClick(5)} className='rounded-full bg-red-200 p-2'>5</button>
          </div>
        </div>
      )}
     <h2> {generatedProjectID}</h2>
    </div>
  );
}

export default StudentRegistration;
