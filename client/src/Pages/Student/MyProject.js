import React, { useEffect, useState } from 'react'
import Layouts from '../../Layouts/Layouts'
import axios from 'axios'
import { PlusCircle } from 'lucide-react';

function MyProject(props) {
   const [projectData,setprojectData] = useState();
   const userData = sessionStorage.getItem('sessionData');
   const[newMember,setNewMember] = useState('');
   const[isClicked,setIsClicked] = useState(false);
   const [selectedAdmissionNumber, setSelectedAdmissionNumber] = useState('');

   const handleSelectChange = (event) => {
     setSelectedAdmissionNumber(event.target.value);
   };
   let admissionNumber;
   if(userData){
     admissionNumber =JSON.parse(userData);
   }
  const [studentData,setStudentData] = useState();
    useEffect(()=>{
        const getProjectData =async()=>{
            const response =await axios.get(`http://localhost:3001/projects/pdSpecific/${admissionNumber.data[0].AdmissionNumber}`);
            setprojectData(response.data.data);
        }
        const getStudentData = async()=>{
            const response = await axios.get('http://localhost:3001/s/studentNotRegistered');
            setStudentData(response.data.data);
        }
        getProjectData();
        getStudentData();
    },[])

    const handleAddMember = async () => {

        try {
           // Replace with the actual admission number
    
          const response = await axios.post(`http://localhost:3001/projects/addStudnets/${projectData[0].ProjectID}`, {
            admissionNumber: newMember,
            user:admissionNumber.data[0].Name,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          // Handle the response as needed
          console.log(response.data);
        } catch (error) {
          // Handle errors
          console.error('Error adding member:', error);
        }
      };
      const handleClick=()=>{
        setIsClicked(true);
        
      }
    const renderCards = () => {
        const numberOfCards = projectData && projectData[0] && projectData[0].ProjectNumber;
      
        if (!numberOfCards) {
          return null; // Return null if the number of cards is not available
        }
      
        const cards = [];
        for (let i = 0; i < numberOfCards; i++) {
          
      
          const cardContent = i < projectData.length ? (
            <div className='flex flex-col gap-2'>
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
                {!isClicked&&<button onClick={handleClick}><PlusCircle size={100} strokeWidth={1}/>Add member</button>}
                {isClicked&&<div>
             <select value={selectedAdmissionNumber} onChange={handleSelectChange}>
                <option value="" disabled>Select Admission Number</option>
                {studentData.map((student) => (
                <option key={student.AdmissionNumber} value={student.AdmissionNumber}>
                    {`${student.AdmissionNumber} - ${student.Name}`}
                </option>
                ))}
            </select>
                    <button onClick={handleAddMember}>Add member</button>
                    </div>}

            </p>
          );
      
          cards.push(
            <div key={i}  className="p-10 bg-white upCard border  text-black w-fit flex justify-center items-center">
              {cardContent}
            </div>
          );
        }
      
        return cards;
      };
      
      
    console.log(projectData);
  return (
    <Layouts>
           <div>
            <div className='text-center bg-bgBlueDark text-white text-3xl rounded-2xl p-2'><h1>{projectData&&projectData[0].ProjectID}</h1></div>
           <div className='flex w-full flex-wrap gap-20 mt-10'>{renderCards()}</div>
           
           </div>
    </Layouts>
  )
}

export default MyProject