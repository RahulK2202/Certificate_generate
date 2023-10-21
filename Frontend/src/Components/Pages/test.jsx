import React from 'react'

function test() {
  return (
    <div>
       <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-1/2 p-4">
        <h1 className="text-3xl font-bold text-center my-4">Certificate of Achievement</h1>
        <hr className="my-4" />
        <p className="text-lg text-center">This is to certify that</p>
        <h2 className="text-2xl font-semibold text-center my-4">John Doe</h2>
        <p className="text-lg text-center">has successfully completed the course</p>
        <h3 className="text-2xl font-semibold text-center my-4">Web Development</h3>
        <p className="text-lg text-center">on</p>
        <h4 className="text-2xl font-semibold text-center my-4">October 19, 2023</h4>
        <div className="text-center mt-8">
          <img src="seal.png" alt="Certificate Seal" className="w-32 h-32 mx-auto" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default test
