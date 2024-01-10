import React,{useState} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
function AddTitle({projectId,onClick}) {
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    console.log(projectId);
    const handleAddTtile = async() => {
        try {
            const response = await axios.post(
              `http://localhost:3001/projects/addprojectTitle/${projectId}`,
              { title: title, abstract: abstract },
              { headers: "Content-Type:application/json" }
            );
      
            setAbstract("");
            setTitle("");
            if (response.status === 200) {
              toast.success("Title and Abstract added ");
             
            }
            if (response.status === 404) {
              toast.error("ProjectID not found");
            }
          } catch (error) {
            setAbstract("");
            setTitle("");
            if (error.response.status === 500) {
              toast.error("Unable to add try again please!");
            }
            console.log(error);
          }
        // Call the callback function provided by the parent
       onClick(0);
      };
  return (
    <div className="w-full flex justify-center items-center mt-5  transition-all ease-in-out duration-300 comeDown">
    <div className="bg-white upCard border flex w-5/6 flex-col p-5 gap-2">
      <label for="title">Project Title:</label>
      <input
        className="outline-none border p-2 "
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
      />
      <label for="abstract" className="mt-2">
        Write Abstract for your Project <small>(max 200 words)</small>
      </label>
      <textarea
        className="outline-none border p-2"
        placeholder="Write your Abstract ....."
        rows={5}
        name="abstract"
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
      />
      <button
        className="w-fit p-2 bg-bgBlueDark text-white rounded-xl w-full mt-2"
        onClick={handleAddTtile}
      >
        Save
      </button>
    </div>
  </div>
  )
}

export default AddTitle