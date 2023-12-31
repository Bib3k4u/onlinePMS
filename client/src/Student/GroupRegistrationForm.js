import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import StudentNav from "./Components/StudentNav";
import { Verification } from "./Verification";
import StudentRegistration from "./StudentRegistration";
const App = () => {
  const [generatedProjectID, setgeneratedProjectID] = useState("");

  const [enrollmentOptions, setEnrollmentOptions] = useState([]);
  const [selectedEnrollment1, setSelectedEnrollment1] = useState("");
  const [studentDetails1, setStudentDetails1] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState(0);
  const [memberMap, setMemberMap] = useState(new Map());
  const [okClicked,setOkClicked] = useState(false);
  const handleSelectedMembersChange = (selectedMembers) => {
    setSelectedMembers(selectedMembers);
  };
  const handleProjectIdeageneartion = (x) => {
    setgeneratedProjectID(x);
  };
  useEffect(() => {
    const fetchEnrollmentOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/enrollmentNumbers`
        );
        const options = response.data.map((enrollment) => ({
          label: enrollment,
          value: enrollment,
        }));
        setEnrollmentOptions(options);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enrollment numbers:", error);
      }
    };

    fetchEnrollmentOptions();
  }, []);
console.log(enrollmentOptions);
  const handleEnrollmentChange1 = async (selectedOption, index) => {
    try {
      if (selectedOption && !enrollments.includes(selectedOption.value)) {
        setEnrollments([...enrollments, selectedOption.value]);
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/studentDetails/${selectedOption.value}`);
        setStudentDetails1([...studentDetails1, response.data]);

        setLoading(false);
      } else if (selectedOption) {
        alert('Please select a different Enrollment number for each Student');
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };
  const [verificationStatus, setVerificationStatus] = useState(Array(selectedMembers).fill(false));

  const handleOkClick = (index) => {
    setOkClicked(true); const updatedVerificationStatus = [...verificationStatus];
    updatedVerificationStatus[index] = true;
    setVerificationStatus(updatedVerificationStatus);
  };
 
  const rows = [];
  for (let i = 0; i < selectedMembers; i++) {
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<div className='w-full '>

<div className="w-full mt-4 md:pr-4 mb-8  bg-cardColor cardShadow rounded-md p-2">
  <h1 className="text-2xl font-bold mb-4">Student {i + 1} Registration</h1>
  {loading && <p>Loading Data...</p>}
  
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-2">
      Select Enrollment Number for Student {i + 1}:
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
  
  {studentDetails1.length > 0 && (
    <div>
      <h2 className="text-lg font-bold mb-2">Student {i + 1} Details</h2>
      <p>Name: {i > studentDetails1.length - 1 ? studentDetails1.nameOfStudent : studentDetails1[i].nameOfStudent}</p>
      <p>Enrollment Number: {i > studentDetails1.length - 1 ? studentDetails1.enrollmentNumber : studentDetails1[i].enrollmentNumber}</p>
      <p>Semester: {i > studentDetails1.length - 1 ? studentDetails1.semester : studentDetails1[i].semester}</p>
      <p>Branch: {i > studentDetails1.length - 1 ? studentDetails1.branch : studentDetails1[i].branch}</p>
      <p>Year: {i > studentDetails1.length - 1 ? studentDetails1.year : studentDetails1[i].year}</p>
      <p>Contact: {i > studentDetails1.length - 1 ? studentDetails1.contact : studentDetails1[i].contact}</p>
      <p>Email: {i > studentDetails1.length - 1 ? studentDetails1.email : studentDetails1[i].email}</p>
      <Verification studentDetails1={i > studentDetails1.length - 1 ? studentDetails1 : studentDetails1[i]} />
    </div>
  )}
</div>

    </div>);
  }

  return (
    <div className="h-auto min-h-screen flex flex-col md:flex-row items-center justify-center bg-color1 text-black">
      <StudentNav />
      <div className="w-full max-w-3xl p-6 mt-20 rounded bg-white ">
        <StudentRegistration onNumberOfMemberSelection={handleSelectedMembersChange} onprojectIdGeneration={handleProjectIdeageneartion} />
        <div>{rows}</div>
      </div>
    </div>
  );
};

export default App;
