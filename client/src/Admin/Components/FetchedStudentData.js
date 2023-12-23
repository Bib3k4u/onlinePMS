import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ... (existing imports)

export default function FetchedStudentData() {
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/studentsData');
        const data = response.data;
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  const handleToggleFilterAlphabetically = () => {
    if (isFiltered) {
      setFilteredData([]);
    } else {
      const sortedData = [...studentData].sort((a, b) => a.nameOfStudent.localeCompare(b.nameOfStudent));
      setFilteredData(sortedData);
    }
    setIsFiltered(!isFiltered);
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchData = studentData.filter(
      (data) =>
        String(data.enrollmentNumber).toLowerCase().includes(searchTermLower) ||
        String(data.admissionNumber).toLowerCase().includes(searchTermLower) ||
        String(data.nameOfStudent).toLowerCase().includes(searchTermLower) ||
        String(data.branch).toLowerCase().includes(searchTermLower) ||
        (typeof data.year === 'number' ? String(data.year) : data.year).toLowerCase().includes(searchTermLower) ||
        String(data.semester).toLowerCase().includes(searchTermLower) ||
        String(data.email).toLowerCase().includes(searchTermLower)
    );
    setFilteredData(searchData);
    setIsFiltered(searchTerm !== ''); // Set isFiltered to true only if searchTerm is not empty
  };

  return (
    <div className="w-full mx-auto mt-8 ">
      <div className="mb-4">
        <div className="flex  items-center mb-2 ml-4">
          <input
            type="text"
            placeholder="Search..."
            className="mr-2 p-2 border border-gray-400 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-color1 text-black hover:bg-blue-400  text- py-2 mr-4 px-4 rounded-md" onClick={handleSearch}>
            Search
          </button>
          <button className="bg-color1 text-black hover:bg-blue-400 py-2 px-4 rounded-md" onClick={handleToggleFilterAlphabetically}>
            {isFiltered ? 'Clear Filter' : 'Sort by Name'}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto m-2">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-color1 text-black">
              <th className="py-3 px-4 text-left">S.N.</th>
              <th className="py-3 px-4 text-left">Enrollment No.</th>
              <th className="py-3 px-4 text-left">Admission No.</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Branch</th>
              <th className="py-3 px-4 text-left">Year</th>
              <th className="py-3 px-4 text-left">Semester</th>
              <th className="py-3 px-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {(isFiltered ? filteredData : studentData).map((data, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 even:bg-blue-50' : 'odd:bg-gray-200'}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{data.enrollmentNumber}</td>
                <td className="py-2 px-4">{data.admissionNumber}</td>
                <td className="py-2 px-4">{data.nameOfStudent}</td>
                <td className="py-2 px-4">{data.branch}</td>
                <td className="py-2 px-4">{data.year}</td>
                <td className="py-2 px-4">{data.semester}</td>
                <td className="py-2 px-4">{data.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}