import Image from 'next/image'
import React from 'react'
import { IoSearchSharp } from 'react-icons/io5'
function index() {
  return (
    <>
      <div className="hidden sm:block">
        <div className="navbar bg-base-100 h-[80px] border shadow-md">
          <div className="flex-1 flex-row gap-[2rem]">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={90}
              height={40}
              className="h-[52px] w-[52px] md:h-[90px] md:w-[90px]"
            />
            <button className="text-lg font-medium">About</button>
            <button className="text-lg font-medium">Category</button>
            <button className="text-lg font-medium">Contact</button>
          </div>
          <div className="w-[27rem] gap-4 rounded-xl">
            <div className="relative w-[20rem] md:w-[20rem]">
              <input
                type="text"
                placeholder="Search Your Location"
                className="input input-bordered w-full rounded-full border-black pl-10"
              />
              <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 transform text-xl text-black" />
            </div>
            <button className="btn btn-sm w-[70px] rounded-2xl border-[#000000] bg-[#ffffff] placeholder:bg-[#854C2F]">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
