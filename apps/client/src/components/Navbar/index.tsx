import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoSearchSharp } from 'react-icons/io5'

function Index() {
  return (
    <>
      <div className="navbar bg-base-100 h-[60px] border shadow-md sm:hidden">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={76}
            height={32}
            className="h-[46px] w-[46px] md:h-[56px] md:w-[56px]"
          />
          <p className="mt-1 border-l border-gray-300 pl-2 font-bold md:text-lg">
            Nami massage
          </p>
        </Link>
      </div>
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
            <Link href="/login">
              <button className="btn btn-sm w-[70px] rounded-2xl border-[#000000] bg-[#ffffff] placeholder:bg-[#854C2F]">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
