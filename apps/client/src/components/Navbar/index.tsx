import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
      <div className="hidden justify-between sm:block">
        <div className="navbar bg-base-100 h-[80px] border shadow-md">
          <div className="flex-1 flex-row gap-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={90}
              height={40}
              className="h-[52px] w-[52px] md:h-[90px] md:w-[90px]"
            />
            <p className="text-2xl font-semibold">Nami Massage</p>
          </div>
          <div className="mr-10 w-[27rem] justify-end gap-4 rounded-xl">
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
