import axios from "axios";
import { Info } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
function AddDocumentLink({projectId,documentName,onlick}) {
  const [dataValue, setDataValue] = useState("");

  const handleSaveFile = async () => {
    if (dataValue === "") {
      toast.error("Not link found in Input field.");
    }
    try{
    const response = await axios.post(
      `http://localhost:3001/projects//addProjectDocuemnt/${projectId}`,
      {
        Link: dataValue,
        documentName: documentName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(response.status===200)
    {
        toast.success(`${documentName} added successfully`);
    }
    setDataValue("");
    }catch(error)
    {
        setDataValue("");
        if(error.response.status!==500)
        {
            toast.error(`Unable to add`)
        }
        console.log(error);
    }

   onlick();
    // console.log("heelo");
  };
  return (
    <div className="w-full flex justify-center items-center mt-5  transition-all ease-in-out duration-300 comeDown">
      <div className="bg-white upCard border w-5/6 flex flex-col items-center justify-center p-8">
        <h2 className="flex felx-row gap-2 text-xl items-center bg-red-300 p-2 rounded-full">
          <Info /> Instructions for uploading {documentName}
        </h2>
        <ul className="text-center mt-2">
          <li>1. Upload your File to the Drive </li>
          <li>
            2. Make the share access as{" "}
            <sapn className="underline font-semibold">
              open anyone from link
            </sapn>
          </li>
          <li>3. Copy the Link and paste in below input box.</li>
          <li>4. Click on Upload</li>
        </ul>

        <input
          type="text"
          placeholder={`Add ${documentName} Link`}
          className={`border bg-gray-200 p-4 outline-none w-full mt-10 upCard rounded-full`}
          onChange={(e) => setDataValue(e.target.value)}
          value={dataValue}
        />
        <button
          className={`w-1/6 p-3 bg-bgBlueDark text-white rounded-full mt-4 `}
          onClick={handleSaveFile}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddDocumentLink;
