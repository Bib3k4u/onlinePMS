import React ,{createContext,useContext,useState} from "react";

const validateEmailState = createContext();

export function EmailValidateSate({children}) {
    const[emailValidFirst,setEmailValidForStudent1] =useState(false);
    const[emailValidSecond,setEmailValidForStudent2] = useState(false);
    return(
            <validateEmailState.Provider value={{emailValidFirst,setEmailValidForStudent1,emailValidSecond,setEmailValidForStudent2}}>
                {children}
            </validateEmailState.Provider>
    );
}
export function useEmailValidateState(){
    return useContext(validateEmailState);
}