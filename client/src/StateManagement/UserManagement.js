import React,{useContext, useState,createContext} from "react";

const userContext = createContext();

export const UserManagement=({children})=>{
    const[user,setUserData] = useState();
    const[userRole,setUserRole] = useState("");
    return (
        <>
        <userContext.Provider value={{user,setUserData,userRole,setUserRole}}>
            {children}
        </userContext.Provider>
        </>
    );
}
export const useLoginManager =()=>useContext(userContext);