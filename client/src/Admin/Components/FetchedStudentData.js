import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Loader component with Tailwind CSS styling
const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-md">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

export default function FetchedStudentData() {
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true); // Show loader while fetching data
        const response = await axios.get('http://localhost:3001/studentsData');
        console.log('Response data:', response.data);
        setStudentData(response.data);
        setFilteredData([]);
        setIsFiltered(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Hide loader after fetching data, even if there's an error
        setIsLoading(false);
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
    setIsFiltered(searchTerm !== '');
  };

  const handleRefreshData = async () => {
    try {
      setIsLoading(true); // Show loader while refreshing data
      const response = await axios.get('http://localhost:3001/studentsData');
      setStudentData(response.data);
      setFilteredData([]);
      setIsFiltered(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Hide loader after refreshing data, even if there's an error
      setTimeout(() => setIsLoading(false), 700); // Show loader for 3 seconds
    }
  };

  return (
    <div className="w-full mx-auto mt-16 ">
      {isLoading && <Loader />}
      <div className='flex justify-center font-semibold text-2xl pt-4 pb-4 bg-bgColor text-textColor'>Student List</div>
      <div className="mb-4 mt-4 flex justify-start md:justify-end xl:justify-end lg:justify-end mr-2">
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row items-center mb-2">
          <div className='mb-4 md:mb-0 lg:mb-0 xl:mb-0'><input
            type="text"
            placeholder="Search..."
            className="mr-2 p-2 border border-gray-400 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-button text-textColor buttonShadow hover:bg-hoverButton tracking-wider py-2 mr-4 px-4 rounded-md" onClick={handleSearch}>
            Search
          </button></div>
         <div className=' flex justify-between'>
         <button className="bg-button text-textColor buttonShadow hover:bg-hoverButton tracking-wider py-2 px-4 rounded-md" onClick={handleToggleFilterAlphabetically}>
            {isFiltered ? 'Clear Filter' : 'Sort by Name'}
          </button>
          <button
            className="bg-button text-textColor buttonShadow hover:bg-hoverButton tracking-wider py-2 px-4 rounded-md ml-4 mr-4"
            onClick={handleRefreshData}
          >
            Refresh Data
          </button>
         </div>
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