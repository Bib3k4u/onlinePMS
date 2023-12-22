import React, { useState,useEffect } from 'react'
import axios  from 'axios';
function FetchedStudentData() {
    const [studentData,setStudentData] = useState([]);
    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/studentsData');
            // Assuming your data is in the 'data' property of the response
            const data = response.data;
             setStudentData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the getData function
        getData();
      }, []);
      console.log(studentData);
  return (
    <div>
        {/* printingt the fetched data  */}
        <div className="w-full mx-auto mt-8">
        <table className="w-full bg-white border border-gray-300 rounded-md">
  <thead>
    <tr className='flex justify-around bg-gray-200'>
      <th className="p-2">Enrollment Number</th>
      <th className="p-2">Admission Number</th>
      <th className="p-2">Name</th>
      <th className="p-2">Branch</th>
      <th className="p-2">Year</th>
      <th className="p-2">Semester</th>
      <th className="p-2">Email</th>
    </tr>
  </thead>
  <tbody>
    {studentData.map((data, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
        <td className="p-2">{data.enrollmentNumber}</td>
        <td className="p-2">{data.admissionNumber}</td>
        <td className="p-2">{data.nameOfStudent}</td>
        <td className="p-2">{data.branch}</td>
        <td className="p-2">{data.year}</td>
        <td className="p-2">{data.semester}</td>
        <td className="p-2">{data.email}</td>
      </tr>
    ))}
  </tbody>
</table>


      </div>
    </div>
  )
}

export default FetchedStudentData