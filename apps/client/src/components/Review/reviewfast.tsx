
import Image from 'next/image'
import React from 'react'


function reviewfast() {
  return (
    <div className=' h-[15rem] bg-white shadow-lg mr-[1.5rem] rounded-xl max-w-[22rem]'>
      <div className='flex'>
        <div>
          <div className='flex flex-1 flex-row p-[20px] gap-[10px]'>
            <Image
              src="/images/sommai.png"
              alt="Logo"
              width={300}
              height={200}
              className="h-[52px] w-[52px] md:h-[70px] md:w-[70px] rounded-full"
            />
            <div className='flex flex-col h-[30%] justify-center'>
              <p className='text-2xl font-semibold'>Sommai</p>

            </div>
          </div>
        </div>
        <div className='p-[1rem] text-lg text-stone-400'>
          <p>30 minute</p>
        </div>
      </div>
      <div className='text-lg pr-[2rem] pl-[2rem] w-full max-w-[21rem] h-full max-h-[3.6rem] break-words truncate'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur ipsam distinctio iste recusandae, excepturi accusantium nobis veritatis voluptate vitae fugit maxime ipsa doloremque laudantium! Delectus maiores iusto quibusdam quaerat.
      </div>
      <div className='flex flex-row  justify-end p-[0.5rem] gap-[0.5rem]'>
        <div className='flex items-center'>
          <p className=''>somsri</p>
        </div>
        <Image
          src="/images/sommai.png"
          alt="Logo"
          width={300}
          height={200}
          className="h-[52px] w-[52px] md:h-[60px] md:w-[60px] rounded-full"
        />
      </div>
    </div>
  )
}

export default reviewfast
