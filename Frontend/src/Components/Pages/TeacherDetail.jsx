import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavbarTeacher from "./NavbarTeacher";
import SidebarTeacher from "./SidebarTeacher";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../API/api";
import axios from "axios";

function TeacherDetail() {
  const navigate = useNavigate();
  // const handleclick = () => {
  //     navigate('/student');
  //   };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/display/`)
      .then((res) => {
        console.log(res, "data coming");

        setData(res.data);
      })
      .catch((error) => {
        console.log(error, "eorrsss");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <NavbarTeacher />
        <div className="flex">
          <SidebarTeacher />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
            {data.map((data, index) => (
              <div
                key={data.id}
                className="w-full h-40 flex justify-evenly bg-blue-gray-300 m-3 items-center"
              >
                <div>
                  <img
                    src={`${BACKEND_BASE_URL}${data.image}`}
                    alt=""
                    className="w-32 h-32 bg-red-300"
                  />
                </div>

                <div>
                  <h1 className="font-bold text-2xl">{data.name}</h1>
                </div>
                <div>
                  <div className="w-52 h-16 text-center bg-deep-orange-400">
                    <Link
                      to={`/student/${data.id}`}
                      className="font-bold pt-5 text-xl"
                    >
                      Student List
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
