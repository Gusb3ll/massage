import Image from 'next/image'
import React from 'react'

function reviewfast() {
  return (
    <div className="mr-[1.5rem] h-[15rem] max-w-[22rem] rounded-xl bg-white shadow-lg">
      <div className="flex">
        <div>
          <div className="flex flex-1 flex-row gap-[10px] p-[20px]">
            <Image
              src="/images/sommai.png"
              alt="Logo"
              width={300}
              height={200}
              className="h-[52px] w-[52px] rounded-full md:h-[70px] md:w-[70px]"
            />
            <div className="flex h-[30%] flex-col justify-center">
              <p className="text-2xl font-semibold">Sommai</p>
            </div>
          </div>
        </div>
        <div className="p-[1rem] text-lg text-stone-400">
          <p>30 minute</p>
        </div>
      </div>
      <div className="h-full max-h-[3.6rem] w-full max-w-[21rem] truncate break-words pl-[2rem] pr-[2rem] text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        consequuntur ipsam distinctio iste recusandae, excepturi accusantium
        nobis veritatis voluptate vitae fugit maxime ipsa doloremque laudantium!
        Delectus maiores iusto quibusdam quaerat.
      </div>
      <div className="flex flex-row justify-end gap-[0.5rem] p-[0.5rem]">
        <div className="flex items-center">
          <p className="">somsri</p>
        </div>
        <Image
          src="/images/sommai.png"
          alt="Logo"
          width={300}
          height={200}
          className="h-[52px] w-[52px] rounded-full md:h-[60px] md:w-[60px]"
        />
      </div>
    </div>
  )
}

export default reviewfast
