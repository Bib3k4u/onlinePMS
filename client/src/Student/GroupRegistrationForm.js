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
        const response = await axios.get(
          `http://localhost:3001/studentDetails/${selectedOption.value}`
        );
        setStudentDetails1([...studentDetails1, response.data]);
        setMemberMap((prevMemberMap) => {
          const newMap = new Map(prevMemberMap);
          newMap.set(index.toString(), response.data);
          return newMap;
        });
        setLoading(false);
      } else if (selectedOption) {
        alert(
          `Please select a different enrollment number for Student ${index}.`
        );
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
    rows.push(
      <>
        <div className="md:w-1/2 md:pr-4 mb-8">
          <h1 className="text-2xl font-bold mb-4">
            Student {i + 1} Registration
          </h1>
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
              onChange={(selectedOption) =>
                handleEnrollmentChange1(selectedOption, i)
              }
              isSearchable
            />
          </div>
          {memberMap.has(i.toString()) && (
            <div>
              <h2 className="text-lg font-bold mb-2">Student {i} Details</h2>
              <p>Name: {memberMap.get(i.toString()).nameOfStudent}</p>
              <p>
                Enrollment Number:{" "}
                {memberMap.get(i.toString()).enrollmentNumber}
              </p>
              <p>Email: {memberMap.get(i.toString()).email}</p>
              <p>Contact: {memberMap.get(i.toString()).contact}</p>
              <p>Year: {memberMap.get(i.toString()).year}</p>
              <p>Semester: {memberMap.get(i.toString()).semester}</p>
              <p>Branch: {memberMap.get(i.toString()).branch}</p>
              <h3>Please confirm your detail and click ok!</h3>
              <Verification
              studentDetails1={memberMap.get(i.toString())}
              verificationStatus={verificationStatus}
              onVerification={handleOkClick}
              index ={i}
            />
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="h-auto min-h-screen flex flex-col md:flex-row items-center justify-center bg-color1 text-black">
      <StudentNav />
      <div className="w-full max-w-5xl p-6 mt-20 rounded bg-white md:flex md:flex-wrap">
        <StudentRegistration
          onNumberOfMemberSelection={handleSelectedMembersChange}
          onprojectIdGeneration={handleProjectIdeageneartion}
        />
        <div>{rows}</div>
      </div>
    </div>
  );
};

export default App;
