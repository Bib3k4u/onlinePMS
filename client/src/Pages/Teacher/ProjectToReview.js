import React, { useEffect, useState } from "react";
import Layouts from "../../Layouts/Layouts";
import { useLoginManager } from "../../StateManagement/UserManagement";
import { useNavigate } from "react-router-dom";
import img from "./../../assests/images/Icons/maths.png";
import axios from "axios";
function ProjectToReview() {
  const temp = sessionStorage.getItem("sessionData");
  let userID;
  if (temp) {
    userID = JSON.parse(temp).data[0].TeacherID;
  }

  const navigate = useNavigate();
  const [datas, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/t/reviewProjects/${userID}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleClick =(value)=>{
    navigate('/projects/myProject',{ state: {ProjectId: value ,roleID:'Reveiwer'} })
  }
  console.log(datas);
  return (
    <Layouts>
        <div className="flex w-full justify-center mt-5 ">
            <h1 className="text-2xl font-monospace font-bold">Projects for Review </h1>
        </div>
        <div className='bg-gray-400 mx-10 mt-5' style={{height:'1px'}}></div>
      <div className="flex felx-col md:flex-row lg:flex-row justify-around mt-10 items-center">
        {datas?.map((data, index) => (
          <div key={index} className="flex flex-col items-center gap-2 hover:cursor " onClick={()=>handleClick(data.ProjectID)}>
            <img
              src={img}
              alt="data"
              width={150}
              className="rounded-full bg-bgBlueDark"
            />
            <label className="text-xl ">{data.ProjectID}</label>
          </div>
        ))}
      </div>
    </Layouts>
  );
}

export default ProjectToReview;
