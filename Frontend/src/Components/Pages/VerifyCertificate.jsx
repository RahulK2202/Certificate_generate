import React, { useState } from 'react'; // Import useState
import { BACKEND_BASE_URL } from '../API/api';
import NavbarTeacher from './NavbarTeacher';
import SidebarTeacher from './SidebarTeacher';
import axios from 'axios';
import toast from 'react-hot-toast';

function VerifyCertificate() {
  const [certificateCode, setCertificateCode] = useState(''); 

  const handleVerifyCertificate = () => {


 
    axios
      .get(`${BACKEND_BASE_URL}/verifycertificate/${certificateCode}/`)
      .then((response) => {
        const data = response.data;
      
        if (data.message) {
          toast.success(data.message); 
          setCertificateCode("")
        } else {
          toast.error("Unknown error occurred");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while verifying the certificate");
       
      });
  };

  return (
    <div>
      <div>
        <NavbarTeacher />
        <div className="flex">
          <SidebarTeacher />
          <div className="p-4">
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Enter Certificate Code"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                value={certificateCode}
                onChange={(e) => setCertificateCode(e.target.value)}
              />
              <button
                className="mt-2 bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
                onClick={handleVerifyCertificate}
              >
                Verify Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyCertificate;
