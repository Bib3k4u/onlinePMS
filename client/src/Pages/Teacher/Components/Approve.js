import { CheckCircle } from 'lucide-react';
import React from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
function Approve(props) {
    const projectID = props.projectId;
    const handleApproveClick = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/projects/changeprojectStatus/${projectID}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                toast.success("Project Status Changed");
            }
            if (response.status === 404) {
                toast.info('Project Id not found');
            }
        } catch (error) {
            if (error.response.status === 500) {
                toast.error('Unable to approve. Server Error');
            }
        }
    }
    

  return (
    <div className='bg-white rounded-full hover:cursor-pointer'>
            <div className='flex flex-row gap-2  items-center p-2' onClick={handleApproveClick}>
                <p className='text-black text-sm'>Approve</p>
                <CheckCircle color='black ' />
            </div>
    </div>
  )
}

export default Approve