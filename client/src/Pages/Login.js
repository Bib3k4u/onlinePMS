import React, { useRef, useState,useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginManager } from "../StateManagement/UserManagement";

function Login() {
  const {setUserRole} = useLoginManager();
  const navigate = useNavigate();
  const loginForm = useRef();
  const [user, setUser] = useState({
    userId: "",
    password: "",
    role: "",
  });
  const options = [
    { value: "Admin", label: "Admin" },
    { value: "Teacher", label: "Professor" },
    { value: "Student", label: "Student" },
  ];
  useEffect(() => {
    // Set isLogedIn status to false when the component mounts
    if(localStorage.getItem('isLogedIn'))
    {
      localStorage.setItem('isLogedIn',false);
      sessionStorage.clear();
    }
  }, []);
  const userData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user?userId=${user.userId}&role=${user.role}`);
      return response.data;
    } catch (error) {
      console.error(error);
      // You might want to throw the error here or handle it appropriately based on your requirements.
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser({
        userId: "",
        password: "",
        role: "",
      });
      if (response.status === 200) {
        localStorage.setItem("isLogedIn", true);
        const value = await userData();
        
        sessionStorage.setItem('sessionData',JSON.stringify(value));
        sessionStorage.setItem('role',user.role);
        setUserRole(user.role)
        navigate("/Home",{ replace: true });
      } else {
        localStorage.setItem("isLogedIn", false);
        setUser({
          userId:"",
          password:"",
          role:""
        })
        toast.error("Invalid userId or Password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      setUser({
        userId: "",
        password: "",
        role: "",
      });
      localStorage.setItem("isLogedIn", false);

      toast.error("Invalid userId or Password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("hello world");
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRoleChange = (selectedOption) => {
    // Update the user state when the role is selected
    setUser((prevUser) => ({
      ...prevUser,
      role: selectedOption.value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col lg:flex-row bg-bgBlue justify-end h-screen">
        <div
          style={{ height: "95vh" }}
          className="shadow-lg shadow-gray-700 rounded-xl mx-2 lg:mx-4 border my-5 p-5 text-black bg-textColor1 lg:w-4/12 flex flex-col items-center justify-between"
        >
          <div className="  text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
            Welcome to Galgotias University
          </div>
          <form
            className="border upCard p-4 rounded-lg w-full"
            ref={loginForm}
            onSubmit={handleSubmit}
          >
            <label htmlFor="userId" className="block mb-2">
              User-ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder="StudentID"
              onChange={handleInputChange}
              value={user.userId}
              required
              className="border rounded-sm p-2 w-full outline-none"
            />
            <label htmlFor="password" className="block mb-2 mt-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              onChange={handleInputChange}
              value={user.password}
              required
              className="border rounded-sm p-2 w-full outline-none"
            />
            <Select
              options={options}
              onChange={handleRoleChange}
              
              placeholder="Identity"
              className="mt-4"
            />
            <button
              type="submit"
              className="bg-bgBlueDark text-white rounded-full px-6 text-center py-2 mt-4"
            >
              Login
            </button>
          </form>
          <div className="copyright"> &copy; 2024 to rycienTech</div>
        </div>
      </div>
    </>
  );
}

export default Login;
