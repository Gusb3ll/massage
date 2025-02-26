import Image from 'next/image'
import React from 'react'
import Marquee from 'react-fast-marquee'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import Navbar from '../components/Navbar/index'
import Reviewfast from '../components/Review/reviewfast'

const Home = () => {
  return (
    <>
      <div className="bg-[#F9F8F7]">
        <Navbar />
        <div>
          <div className="flex justify-center pb-[3rem] pt-[3rem]">
            <div className="relative h-[50rem] w-[90%] rounded-2xl bg-[url(/images/indeximg.png)] bg-cover p-[2rem]">
              <p className="w-[70vh] text-6xl font-bold text-white drop-shadow-md">
                Relieve your fatigue with professional massage therapy
              </p>
              <p className="absolute bottom-10 end-0 w-[45vh] text-white">
                “This is more than just a service it’s a personalized journey
                towards ultimate relaxation and satisfaction. Discover a new way
                to enjoy massages, designed entirely around your preferences.”
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[5%] p-[3rem] pt-[1rem]">
          <div className="flex justify-end">
            <Image
              src="/images/indeximg2.png"
              alt="bg1"
              width={300}
              height={200}
              className="h-[52px] w-[52px] rounded-xl md:h-[300px] md:w-[500px]"
            />
          </div>
          <p className="mt-auto w-[40%] flex-initial text-xl">
            Website that redefines your massage experience, offering you
            complete control over every detail. With our platform, you can
            conveniently choose the perfect location to receive your massage and
            handpick your preferred therapist to suit your needs.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="mb-[1rem] text-4xl font-medium">Review form user</p>
          <div className="mb-[1rem] flex h-[auto] w-[85%] flex-row">
            <Marquee>
              <Reviewfast />
              <Reviewfast />
              <Reviewfast />
              <Reviewfast />
            </Marquee>
          </div>
        </div>

        <div className="flex items-center justify-center p-[4rem]">
          <Image
            src="/images/image.png"
            alt="mid"
            width={150000}
            height={1500000}
            className="h-[52px] w-[52px] rounded-xl md:h-[55vh] md:w-[85%]"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-auto w-[90%] flex-col rounded-xl bg-[#ffffff] p-[4vh] shadow-xl">
              <p className="text-3xl font-medium">Recommend Massager</p>
              <div className="flex flex-row items-center justify-center gap-[2vh]">
                <button className="flex h-[50px] w-[50px] items-center justify-center rounded-full shadow-md">
                  <IoIosArrowBack className="h-[70%] w-[70%]"></IoIosArrowBack>
                </button>
                <div>hello</div>
                <button className="flex h-[50px] w-[50px] items-center justify-center rounded-full shadow-md">
                  <IoIosArrowForward className="h-[70%] w-[70%]"></IoIosArrowForward>
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default Home
