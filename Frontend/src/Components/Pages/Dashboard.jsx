import React from 'react'
import NavbarTeacher from './NavbarTeacher'
import SidebarTeacher from './SidebarTeacher'

function Dashboard() {
  return (
    <div>
      <NavbarTeacher/>
      <div className="flex">

<SidebarTeacher/>

      </div>
    </div>
  )
}

export default Dashboard
