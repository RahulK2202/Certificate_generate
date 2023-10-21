import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function SidebarTeacher() {



    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const navigate = useNavigate(); // Initialize the useNavigate hook
  
    // Define the medium breakpoint in pixels (you can adjust this value as needed)
    const mediumBreakpoint = 768;
  
    // Function to update the "open" state based on the window size
    const updateOpenState = () => {
      if (window.innerWidth < mediumBreakpoint) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
  
  
    const Menus = [
      { title: "Teacher",  path: "/detail" },
      { title: "Student",   path: "/teacherdata" },
      { title: "Verify certificate",   path: "/verify" },

    ];

  return (
    <div>
      <div className="flex">
      <div
        className={`bg-gray-800 h-screen z-auto p-6 pt-8 ${
          open ? "w-40" : "w-20"
        } duration-300 relative `}
      >
        

        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
        
          
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className=" text-sm text-gray-300 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 "
                onClick={() => {
                  if (menu.path) {
                    navigate(menu.path);
                
                  }
                }}
              >
           
                <span
                  className={` text-base font-medium flex-1 duration-300 ${
                    !open && "hidden"
                  } `}
                >
         
                  {menu.title}
                </span>
               
              </li>
             
            </>
          ))}
        </ul>
      </div>
    </div>
    </div>
  )
}

export default SidebarTeacher
