import React,{useContext, useState,createContext} from "react";

const userContext = createContext();

export const UserManagement=({children})=>{
    const[userID,setUserData] = useState();
    const[userRole,setUserRole] = useState("");
    return (
        <>
        <userContext.Provider value={{userID,setUserData,userRole,setUserRole}}>
            {children}
        </userContext.Provider>
        </>
    );
}
export const useLoginManager =()=>useContext(userContext);