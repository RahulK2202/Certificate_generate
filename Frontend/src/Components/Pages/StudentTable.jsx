import React, { useEffect, useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import NavbarTeacher from './NavbarTeacher';
import SidebarTeacher from './SidebarTeacher';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../API/api';
import axios from 'axios';
import toast from 'react-hot-toast';

function StudentTable() {
  const TABLE_HEAD = ['Student Name', 'Status'];
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isCertificateGenerated, setIsCertificateGenerated] = useState(false);
  const fetchData = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/studentdata/${teacherId}/`)
      .then((res) => {
        console.log(res,"changes made data");
        setData(res.data);
      })
      .catch((error) => {
        console.log(error, 'errors');
      });
  };

  const handleGenerateCertificate = async (teacherId, studentId) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/createcertificate/`, {
        teacher_id: teacherId,
        student_id: studentId,
      });
      console.log(response, 'data coming');
      toast.success("certificate generated")
      fetchData();
    } catch (error) {
      toast.error("failed to generate")
      console.log(error, 'errors');
    }
  };

  useEffect(() => {
    fetchData();
  }, [teacherId]);

  return (
    <div>
      <NavbarTeacher />
      <div className="flex">
        <SidebarTeacher />

        <Card className="h-full mx-auto w-screen lg:w-1/2 mt-20">
          <table className="w-full  table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.students &&
                data.students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {student.name}
                      </Typography>
                    </td>
                    <td>
                      {student.has_certificate ? (
                        <Link to={`/certificate/${teacherId}/${student.id}`}>
                          View Certificate
                        </Link>
                      ) : (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() =>
                            handleGenerateCertificate(teacherId, student.id)
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          Generate Certificate
                        </Typography>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default StudentTable;
