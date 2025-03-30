import Image from 'next/image'
import React from 'react'
import Marquee from 'react-fast-marquee'

import AppLayout from '@/components/Layouts/App'
import LandingLayout from '@/components/Layouts/Landing'

import Reviewfast from '../components/Review/reviewfast'

const Home = () => {
  return (
    <>
      <AppLayout>
        <LandingLayout>
          <div className="bg-[#F9F8F7]">
            <div className="mt-0 flex justify-center sm:mt-8">
              <div className="relative h-[15rem] w-full bg-[url(/images/indeximg.png)] bg-cover p-[2rem] sm:h-[45rem] sm:w-[90%] sm:rounded-2xl">
                <p className="hidden w-[70vh] text-5xl font-bold text-white drop-shadow-md sm:block">
                  Relieve your fatigue with professional massage therapy
                </p>
                <p className="absolute bottom-10 end-0 hidden w-[45vh] text-white sm:block">
                  “This is more than just a service it’s a personalized journey
                  towards ultimate relaxation and satisfaction. Discover a new
                  way to enjoy massages, designed entirely around your
                  preferences.”
                </p>
              </div>
            </div>
            <div className="mt-5 hidden sm:block">
              <div className="flex flex-row items-center gap-8 px-28 py-12">
                <Image
                  src="/images/indeximg2.png"
                  alt="bg1"
                  width={300}
                  height={200}
                  className="h-[52px] w-[52px] rounded-xl md:h-[300px] md:w-[500px]"
                />
                <p className="text-xl">
                  <span className="text-4xl font-bold">Website</span> that
                  redefines your massage experience, offering you complete
                  control over every detail. With our platform, you can
                  conveniently choose the perfect location to receive your
                  massage and handpick your preferred therapist to suit your
                  needs.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center sm:mt-5">
              <p className="text-4xl font-medium">Review form user</p>
              <div className="mt-12 flex h-[auto] w-[85%] flex-row">
                <Marquee>
                  <Reviewfast />
                  <Reviewfast />
                  <Reviewfast />
                  <Reviewfast />
                </Marquee>
              </div>
            </div>

            <div className="flex items-center justify-center p-16">
              <Image
                src="/images/image.png"
                alt="mid"
                width={1000}
                height={900}
                quality={100}
                className="h-[200px] w-[1000px] rounded-xl md:h-[500px] md:w-[1000px]"
              />
            </div>

            {/* <div className="flex flex-col">
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
            </div> */}
          </div>
        </LandingLayout>
      </AppLayout>
    </>
  )
}

export default Home
