import React, { useEffect, useState } from "react";
import Layouts from "../../Layouts/Layouts";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Approve from "../Teacher/Components/Approve";
import { useNavigate } from "react-router-dom";
import AddTitle from "./Components/AddTitle";
import DocumentStatus from "./Components/DocumentStatus";
import UpdateMarks from "../Teacher/Components/UpdateMarks";
function MyProject(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectData, setprojectData] = useState();
  const userData = sessionStorage.getItem("sessionData");
  const [isClicked, setIsClicked] = useState(false);
  const [selectedAdmissionNumber, setSelectedAdmissionNumber] = useState("");

  // const [roleId,setRoleID] = useState("");

  const [addClick, setaddClick] = useState();
  const handleSelectChange = (event) => {
    setSelectedAdmissionNumber(event.target.value);
  };
  console.log(selectedAdmissionNumber);
  let admissionNumber;
  if (userData) {
    admissionNumber = JSON.parse(userData);
  }
  console.log(admissionNumber);

  const [studentData, setStudentData] = useState();
  let myData;
  const [userID, setUserID] = useState();
  const yourData = location.state && location.state.ProjectId;
  myData = yourData;
  const roleId = location.state && location.state.roleID;
  //  console.log(roleValue);
  // / Set userID based on role
  let userI;
  if (sessionStorage.getItem("role") === "Student") {
    userI = admissionNumber && admissionNumber.data[0].AdmissionNumber;
  } else if (sessionStorage.getItem("role") === "Teacher") {
    userI = myData;
  }
  console.log(userI);
  useEffect(() => {
    // Access the passed data

    // Fetch project data based on userID and role
    const getProjectData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/projects/pdSpecific/?userID=${userI}&role=${sessionStorage.getItem(
            "role"
          )}`
        );
        setprojectData(response.data.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
        // Handle errors as needed
      }
    };

    // Check if userID and role are defined before making the request

    getProjectData();
  }, [userI]);
 

  const handleAddMember = async () => {
    try {
      // Replace with the actual admission number

      const response = await axios.post(
        `http://localhost:3001/projects/addStudnets/${projectData[0].ProjectID}`,
        {
          admissionNumber: selectedAdmissionNumber,
          user: admissionNumber.data[0].Name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedAdmissionNumber("");
      setIsClicked(false);
      const updatedProjectData = await axios.get(
        `http://localhost:3001/projects/pdSpecific/?userID=${userI}&role=${sessionStorage.getItem(
          "role"
        )}`
      );
      setprojectData(updatedProjectData.data.data);

      // Reset the form or any other state if needed
    
    } catch (error) {
      // Handle errors
      console.error("Error adding member:", error);
    }
  };
  const handleAddTtile = async (data) => {
    try {
      const updatedProjectData = await axios.get(
        `http://localhost:3001/projects/pdSpecific/?userID=${userI}&role=${sessionStorage.getItem(
          "role"
        )}`
      );

      setaddClick(0);
      setprojectData(updatedProjectData.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateMarks = async(data)=>{
   
      try {
        const updatedProjectData = await axios.get(
          `http://localhost:3001/projects/pdSpecific/?userID=${userID}&role=${sessionStorage.getItem(
            "role"
          )}`
        );
  
        setprojectData(updatedProjectData.data.data);
      } catch (error) {
        console.log(error);
      }
    
  }

  const handleClick = async (index) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/s/studentNotRegistered"
      );
      setStudentData(response.data.data);
    } catch (error) {
      console.log("error");
    }
    const newClickedCards = [...clickedCards];
    newClickedCards[index] = !newClickedCards[index]; // Toggle the clicked state
    setClickedCards(newClickedCards);
  };
  const handleAddClick = (value) => {
    setaddClick(value);
  };
  const [clickedCards, setClickedCards] = useState(Array(  projectData && projectData[0] && projectData[0].ProjectNumber).fill(false));

  const renderCards = () => {
    const numberOfCards =
      projectData && projectData[0] && projectData[0].ProjectNumber;

    if (!numberOfCards) {
      return null; // Return null if the number of cards is not available
    }

    const cards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const isCardClicked = clickedCards[i];

      const cardContent =
        i < projectData.length ? (
          <div className="flex flex-col gap-2">
            <div>Admission Number: {projectData[i].AdmissionNumber}</div>
            <div>Name: {projectData[i].Name}</div>
            <div>Email: {projectData[i].Email}</div>
            <div>Phone: {projectData[i].Phone}</div>

            <div>Branch: {projectData[i].Branch}</div>

            <div>Year: {projectData[i].Year}</div>

            <div>Semester: {projectData[i].Semester}</div>
            <div>Registered by: {projectData[i].Addby}</div>
          </div>
        ) : (
          <p>
            {!isCardClicked && (
              <button onClick={()=>handleClick(i)}>
                <PlusCircle size={100} strokeWidth={1} />
                Add member
              </button>
            )}
            {isCardClicked && (
              <div>
                <select
                  value={selectedAdmissionNumber}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    Select Admission Number
                  </option>
                  {studentData.map((student) => (
                    <option
                      key={student.AdmissionNumber}
                      value={student.AdmissionNumber}
                    >
                      {`${student.AdmissionNumber} - ${student.Name}`}
                    </option>
                  ))}
                </select>
                <button onClick={handleAddMember}>Add member</button>
              </div>
            )}
          </p>
        );

      cards.push(
        <div
          key={i}
          className="p-10 bg-white upCard border  text-black w-fit flex justify-center items-center"
        >
          {cardContent}
        </div>
      );
    }

    return cards;
  };

  // console.log(projectData);
  return (
    <Layouts>
      <div>
        <ToastContainer />
        <div className="text-center bg-bgBlueDark text-white text-3xl rounded-2xl p-2 relative">
          <h1>{projectData && projectData[0].ProjectID}</h1>
          <div className="absolute top-2 right-2 flex flex-row gap-4">
            <div
              className={`flex justify-center items-center gap-2 ${
                projectData && projectData[0].Status === "Pending"
                  ? "bg-red-500"
                  : "bg-green-500"
              } p-1 rounded-xl pl-2 pr-2 pb-2 text-white`}
            >
              <div
                className={`bg-white rounded-full `}
                style={{ width: "10px", height: "10px" }}
              ></div>
              <p className="text-base">
                {projectData && projectData[0].Status}
              </p>
            </div>
            {roleId === "Guide" &&
              projectData &&
              projectData[0].Status === "Pending" && (
                <>
                  <Approve
                    projectId={projectData && projectData[0].ProjectID}
                  />
                </>
              )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row items-center w-full justify-around gap-20 mt-10">
          {renderCards()}
        </div>
        <div>
          <div className="flex m-10 justify-center items-center">
            <div className="flex-1">
              <div style={{ height: "2px" }} className="bg-gray-300"></div>
            </div>

            <div className="flex-0 ml-4 mr-4 font-bold">
              <h2>Project Details</h2>
            </div>

            <div className="flex-1">
              <div style={{ height: "2px" }} className="bg-gray-300"></div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {" "}
            <div className="flex flex-col md:flex-row lg:flex-row justify-around items-center gap-4 w-5/6 ">
              <button
                className="w-full p-2 bg-bgBlueDark text-white rounded-xl"
                onClick={() => handleAddClick(1)}
              >
                Add title and Abstract
              </button>
              <button className="w-full p-2 bg-bgBlueDark text-white rounded-xl">
                Add PPT
              </button>
              <button className="w-full p-2 bg-bgBlueDark text-white rounded-xl">
                Add Project Report
              </button>
              <button className="w-full p-2 bg-bgBlueDark text-white rounded-xl">
                {" "}
                Project Link
              </button>
            </div>
          </div>
        </div>
        {addClick === 1 && (
          <AddTitle
            onlick={handleAddTtile}
            projectId={projectData && projectData[0].ProjectID}
          />
        )}
        <DocumentStatus projectId={userI} />

        {roleId === "Reveiwer" && <UpdateMarks projectId={userI} onlick={handleUpdateMarks}/>}
      </div>
    </Layouts>
  );
}

export default MyProject;
