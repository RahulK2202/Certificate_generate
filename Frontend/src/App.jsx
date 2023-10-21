import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Components/Pages/Dashboard";
import TeacherDetail from "./Components/Pages/TeacherDetail";
import StudentTable from "./Components/Pages/StudentTable";
import StudentCertificate from "./Components/Pages/StudentCertificate";
import StudentTeacher from "./Components/Pages/StudentTeacher";
import VerifyCertificate from "./Components/Pages/VerifyCertificate";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail" element={<TeacherDetail />} />
          <Route path="/student/:teacherId" element={<StudentTable />} />
          <Route path="/certificate/:teacherId/:studentId" element={<StudentCertificate />}/>
          <Route path="/teacherdata" element={<StudentTeacher/>} />
          
          <Route path="/verify" element={< VerifyCertificate/>} /> 
            
        </Routes>
      </Router>
    </div>
  );
}

export default App;
