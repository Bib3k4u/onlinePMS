import React from 'react'
import{BrowserRouter as Router,Route,Routes} from 'react-router-dom';
// import { Verification } from './Student/Verification'
import GroupRegistrationForm from './Student/GroupRegistrationForm'
import StudentList from './Admin/StudentList'
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/"element={<Home />} />
        <Route path="/admin/uploadSL"element={<StudentList />} />

        <Route path="/student/createGroup" element={<GroupRegistrationForm />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </Router>

  )
}

export default App
