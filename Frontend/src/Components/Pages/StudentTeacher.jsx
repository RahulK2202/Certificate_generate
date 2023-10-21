import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../API/api';
import NavbarTeacher from './NavbarTeacher';
import SidebarTeacher from './SidebarTeacher';

function StudentTeacher() { // Added "function" keyword here
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [teacherDetails, setTeacherDetails] = useState(null);

  useEffect(() => {
    axios.get(`${BACKEND_BASE_URL}/api/students/`)
      .then((response) =>
      
      setStudents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    axios.get(`${BACKEND_BASE_URL}/api/teacher/${student.id}`)
      .then((response) => {
        setTeacherDetails(response.data);
        console.log("Teacher Details:", response.data); // Add this line to log the teacher data
      })
      .catch((error) => console.error(error));
  };
  

  return (
    <div>
    <NavbarTeacher />
    <div className="flex">
      <SidebarTeacher /> 
      <div className='flex flex-col space-y-2 text-center w-full' >
      <h1 className='p-2 text-2xl font-bold'>Student List</h1>
      <ul className='flex space-x-4 ml-4'>
        {students.map((student) => (
          <li className='border-2 p-2 border-black rounded-xl cursor-pointer hover:bg-green-400' key={student.id} onClick={() => handleStudentClick(student)}>
            {student.name}
          </li>
        ))}
      </ul>
      <br />
      
      {selectedStudent && (
        <div>
          <h2 className='p-2 text-2xl font-bold'>Selected Student: <span className='p-2 text-2xl font-bold text-blue-700'>{selectedStudent.name}</span></h2>
          <h2 className='p-2 text-2xl font-bold'>Teacher Details</h2>
          {teacherDetails && (
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
             
              {teacherDetails.map((teacher) => (
                <div
                  key={teacher.id}
                  className="w-full h-40 flex justify-evenly bg-blue-gray-300 m-3 items-center"
                >
                  <div>
                    <img
                      src={`${BACKEND_BASE_URL}${teacher.image}`}
                      alt=""
                      className="w-32 h-32 bg-red-300" 
                    />
                  </div>
                  <div>
                    <p>Name: {teacher.name}</p>
                    <p>Number of Students: {teacher.students.length}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  </div>
  
  );
}

export default StudentTeacher;
