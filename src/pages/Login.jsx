// eslint-disable-next-line no-unused-vars
import React from 'react'

const Login = () => {
  return (
    <div className=''>
      <div className="bg-image bg-cover bg-center h-screen flex justify-center md:justify-end items-center w-full m-0">
          <div className="bg-white/70 rounded-xl w-96 h-80 md:mr-36">
              <h2 className='font-semibold text-2xl text-center py-5'>Welcome Back</h2>
              <div className="flex flex-col px-9">
                <label htmlFor="email" className='font-normal text-xl'>Email</label>
                <input type="text" className='px-4 py-2 rounded-xl outline-blue-100'/>
                <label htmlFor="password" className='font-normal text-xl pt-2'>Password</label>
                <input type="password" className='px-4 py-2 rounded-xl outline-blue-100'/>
              </div>
              <div className="flex px-9 justify-between pt-9">
                <button className='bg-white text-blue-500 rounded-lg hover:bg-slate-100 w-fit px-4 py-2 text-lg font-semibold'>Create Account</button>
                <button className='bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-fit px-4 py-2 text-lg font-medium'>Log In</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Login