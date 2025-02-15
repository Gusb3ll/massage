import Image from 'next/image'
import React from 'react'
function index() {
  return (
    <>
      <div className="navbar bg-base-100 h-[70px] border shadow-md">
        <div className="flex-1">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={81}
            height={37}
            className="h-[52px] w-[52px] md:h-[62px] md:w-[62px]"
          />
        </div>
        <div className="gap-4 rounded-xl">
          <div className="form-control border-[#000000] bg-[#ffffff]">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <button className="btn btn-sm w-[70px] rounded-2xl border-[#000000] bg-[#ffffff]">
            Login
          </button>
        </div>
      </div>
    </>
  )
}

export default index
