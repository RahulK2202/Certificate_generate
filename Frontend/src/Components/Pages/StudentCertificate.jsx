import React, { useEffect, useState } from 'react';
import NavbarTeacher from './NavbarTeacher';
import SidebarTeacher from './SidebarTeacher';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../API/api';

const StudentCertificate = ({ studentName, teacherName, issueDate }) => {

    const [data, setData] = useState([]);
    const { teacherId, studentId } = useParams();

    console.log(teacherId, studentId ,"both here");
    
    useEffect(() => {
        const fetchCertificateData = async () => {
          try {
            const response = await axios.get(`${BACKEND_BASE_URL}/api/getcertificate/${teacherId}/${studentId}/`);
            console.log(response.data,"certificateeeeee");
            setData(response.data);
          } catch (error) {
            console.error("Error fetching certificate data:", error);
          }
        };
    
        fetchCertificateData();
      }, [teacherId, studentId]);
    
   



    return (

        <div>
          <NavbarTeacher />
      <div className="flex">
        <SidebarTeacher/>
        <div className="w-full mt-16 h-full flex justify-center items-center">
            <div className="w-96 bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-4">Certificate of Achievement</h1>
                <p className="text-center">Certificate no: {data.certificate_id}</p>
                <div className="mb-4">
                    <p>This is to certify that</p>
                    <h2 className="text-2xl font-semibold">{data.student_name}</h2>
                </div>
                <div className="mb-4">
                    <p>Has successfully completed a course under the guidance of</p>
                    <h2 className="text-2xl font-semibold">{data.teacher_name}</h2>
                </div>
                <div className="mb-4">
                    <p>On this</p>
                    <p className="text-2xl font-semibold">{data.issue_data}</p>
                </div>
                <p className="text-center">Signature: __________________________</p>
            </div>
        </div>
        </div>
        </div>
    );
};

export default StudentCertificate;
