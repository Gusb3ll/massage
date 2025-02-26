import Image from 'next/image'
import React from 'react'
import Marquee from "react-fast-marquee";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


import Navbar from '../components/Navbar/index'
import Reviewfast from '../components/Review/reviewfast';

const Home = () => {

  return (
    <>
      <div className='bg-[#F9F8F7]'>
        <Navbar />
        <div>
          <div className='pt-[3rem] flex justify-center pb-[3rem]'>
            <div className="relative h-[50rem] w-[90%] bg-[url(/images/indeximg.png)] bg-cover rounded-2xl p-[2rem]">
              <p className='text-6xl font-bold text-white w-[70vh] drop-shadow-md'>Relieve your fatigue with professional massage therapy</p>
              <p className='absolute bottom-10 end-0 text-white w-[45vh]'>“This is more than just a service it’s a personalized
                journey towards ultimate relaxation and satisfaction.
                Discover a new way to enjoy massages,
                designed entirely around your preferences.”</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center p-[3rem] pt-[1rem] gap-[5%] items-center'>
          <div className='flex justify-end'>
            <Image
              src="/images/indeximg2.png"
              alt="bg1"
              width={300}
              height={200}
              className="h-[52px] w-[52px] md:h-[300px] md:w-[500px] rounded-xl"
            />
          </div>
          <p className='text-xl w-[40%] flex-initial mt-auto'>Website that redefines your massage experience,
            offering you complete control over every detail.
            With our platform, you can conveniently choose the
            perfect location to receive your massage and handpick
            your preferred therapist to suit your needs.
          </p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <p className='text-4xl font-medium mb-[1rem]'>Review form user</p>
          <div className='flex flex-row h-[auto] w-[85%] mb-[1rem]'>
            <Marquee>
              <Reviewfast />
              <Reviewfast />
              <Reviewfast />
              <Reviewfast />
            </Marquee>
          </div>
        </div>

        <div className='p-[4rem] flex justify-center items-center'>
          <Image
            src="/images/image.png"
            alt="mid"
            width={150000}
            height={1500000}
            className="h-[52px] w-[52px] md:h-[55vh] md:w-[85%] rounded-xl"
          />
        </div>

        <div className='flex flex-col'>
          <div className='flex flex-col justify-center items-center'>
            <div className='bg-[#ffffff] w-[90%] h-auto shadow-xl flex flex-col p-[4vh] rounded-xl'>
              <p className='text-3xl font-medium'>Recommend Massager</p>
              <div className='flex flex-row justify-center items-center gap-[2vh]'>
                <button className='flex w-[50px] h-[50px] shadow-md rounded-full items-center justify-center'>
                  <IoIosArrowBack className='w-[70%] h-[70%]'></IoIosArrowBack>
                </button>
                <div>
                  hello
                </div>
                <button className='flex w-[50px] h-[50px] shadow-md rounded-full items-center justify-center'>
                  <IoIosArrowForward className='w-[70%] h-[70%]'></IoIosArrowForward>
                </button>

              </div>
            </div>
          </div>
          <div>

          </div>
        </div>



      </div>

    </>
  )
}

export default Home
