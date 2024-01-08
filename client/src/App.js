import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigation } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { useLoginManager } from './StateManagement/UserManagement';
import Forbidden from './Pages/Forbidden';
import AddStudent from './Pages/Admin/AddStudent';
import AddTeacher from './Pages/Admin/AddTeacher';
import CreateProject from './Pages/Student/CreateProject';
const isAuthenticated = () => {
  // Check if userId is present in the session
  const loginStaus = localStorage.getItem('isLogedIn');
  console.log(loginStaus);
  return loginStaus==='true';
};


const PrivateRoute = ({ element, ...rest}) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/" replace /> // Redirect to login page if not authenticated
  );
};

const App = () => {
  const isPermissiedAsAdmin = ()=>{
     const userRole = sessionStorage.getItem('role');
     return userRole==='Admin'
  }
  const AdminAccesedRoute =({element,...rest})=>{
    return isPermissiedAsAdmin()?(element):(<Navigate to="/forbidden" replace />);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Home"
          element={<PrivateRoute element={<Home />} />}
        />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route
          path="/s/Home"
          element={<PrivateRoute element={<Home />} />}
        />
         <Route
          path="/g/Home"
          element={<PrivateRoute element={<Home />} />}
        />
         <Route
          path="/r/Home"
          element={<PrivateRoute element={<Home />} />}
        />
         <Route
          path="/p/Home"
          element={<PrivateRoute element={<Home />} />}
        />
         <Route
          path="/a/addStudent"
          element={<AdminAccesedRoute element={<AddStudent />} />}
        />
         <Route
          path="/a/addTeacher"
          element={<AdminAccesedRoute element={<AddTeacher />} />}
        />
        <Route path="project/createProject"
        element={<CreateProject /> }/>
      </Routes>
    </Router>
  );
};

export default App;
