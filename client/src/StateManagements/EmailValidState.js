import React ,{createContext,useContext,useState} from "react";

const validateEmailState = createContext();

export function EmailValidateSate({children}) {
    const[projectId,setProjectId] =useState("");
    return(
            <validateEmailState.Provider value={{projectId,setProjectId}}>
                {children}
            </validateEmailState.Provider>
    );
}
export function useEmailValidateState(){
    return useContext(validateEmailState);
}