import { CheckCircle, ViewIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function UpdateMarks({ onlick, projectId }) {
  const [examName, setExamaName] = useState("Review1Marks");
  const [data, setData] = useState([]);
  const [marks, setMarks] = useState("");
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/projects/groupData/${projectId}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [projectId]);
  const handleUpdate = async (value) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/t/updateMarks/${projectId}`,
        { marks: marks, admissionNumber: value, examName: examName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMarks('');
      if (response.status === 200) {
        toast.success(`${examName} marks updated`);
      }
    } catch (error) {
      if (error.response.status === 500) {
        toast.error("unable to update server Error");
      }
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/projects/groupData/${projectId}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [values, setValue] = useState(0);
  function handleClick(value) {
    setValue(value);
  }

  return (
    <div className="mt-10 mx-10">
      <div className="w-full flex flex-col lg:flex-row justify-end items-center">
        <div className="flex flex-row gap-4">
          <button
            className={`bg-bgBlueDark p-2 rounded-full ${
              values === 1
                ? "bg-white text-black border border-black"
                : "bg-bgBlueDark text-white"
            }`}
            onClick={() => {
              setExamaName("Review1Marks");
              handleClick(1);
            }}
          >
            Review 1
          </button>
          <button
            className={`bg-bgBlueDark p-2 rounded-full ${
              values === 2
                ? "bg-white text-black border border-black"
                : "bg-bgBlueDark text-white"
            }`}
            onClick={() => {
              setExamaName("Review2Marks");
              handleClick(2);
            }}
          >
            Review 2
          </button>
        </div>
      </div>

      <table className="min-w-full bg-cardColor shadow-md mt-5 rounded-md overflow-hidden">
        <thead className="bg-color1 text-black">
          <tr>
            <th className="py-3 px-4 text-left">SN.</th>
            <th className="py-3 px-4 text-left">Admission Number</th>
            <th className="py-3 px-4 text-left">{examName}</th>
            <th className="py-3 px-4 text-left ">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{index + 1}.</td>
              <td className="py-2 px-4">{d.StudentID}</td>
              <td>
                 <input
                  type="text"
                  className="p-2 border rounded-xl"
                  placeholder={`update ${examName} marks`}
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />

              </td>
              <td>
                <button
                  className="bg-green-600 p-2 rounded-full flex flex-row gap-2 text-white"
                  onClick={() => handleUpdate(d.StudentID)}
                >
                  Update
                  <CheckCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateMarks;
