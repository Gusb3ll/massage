import Image from 'next/image'
import React from 'react'
// import Marquee from 'react-fast-marquee'

import AppLayout from '@/components/Layouts/App'
import LandingLayout from '@/components/Layouts/Landing'

// import Reviewfast from '../components/Review/reviewfast'

const Home = () => {
  return (
    <>
      <AppLayout>
        <LandingLayout>
          <div className="bg-[#ffffff]">
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
              <div className="flex flex-row items-center gap-8 px-14 py-12">
                <Image
                  src="/images/indeximg2.png"
                  alt="bg1"
                  width={300}
                  height={200}
                  className="h-[52px] w-[52px] rounded-xl md:h-[300px] md:w-[600px]"
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

            <div className="mt-14 flex flex-row flex-wrap justify-center gap-8 py-4 sm:flex-col md:gap-16">
              <h1 className="mx-4 text-center text-3xl font-semibold md:ml-20 md:text-left">
                ทำไมถึงควรเลือกเรา
              </h1>
              <div className="flex flex-wrap justify-center gap-5 sm:flex-row sm:gap-8 md:flex-row lg:flex-row">
                <div className="flex h-auto max-w-[350px] flex-grow flex-col rounded-xl border border-gray-300 bg-white p-4 shadow-lg transition-all hover:translate-y-[-10px]">
                  <div className="flex flex-row gap-2">
                    {/* <FaBoltLightning size="32" /> */}
                    <p className="text-2xl font-semibold">รวดเร็ว</p>
                  </div>
                  <hr className="mt-2 text-gray-500" />
                  <p className="text-md mt-2 text-[#666666]">
                    คุณสามารถสร้าง หรือ รับเมลของคุณได้รวดเร็ว
                    เพียงแค่ในไม่กี่นาที
                  </p>
                  <div className="mt-11 flex flex-row items-center justify-between gap-2">
                    <p className="text-md text-[#666666]">
                      *โดยจะเป็นตามข้อกำหนดการใช้งาน
                    </p>
                    {/* <RiVerifiedBadgeFill size="24" className="text-green-500" /> */}
                  </div>
                </div>

                <div className="flex h-auto max-w-[350px] flex-grow flex-col rounded-xl border border-gray-300 bg-white p-4 shadow-lg transition-all hover:translate-y-[-10px]">
                  <div className="flex flex-row gap-2">
                    {/* <FaShieldAlt size="32" /> */}
                    <p className="text-2xl font-semibold">ปลอดภัย</p>
                  </div>
                  <hr className="mt-2 text-gray-500" />
                  <p className="text-md mt-2 text-[#666666]">
                    ข้อมูลของคุณถูกรับและส่งอย่างปลอดภัยด้วย SSL และ Database
                    ที่มีความน่าเชื่อถือโดยมี Web Application Firewall
                    ป้องกันไว้แล้ว
                  </p>
                  <div className="mt-6 flex flex-row items-center justify-between gap-2">
                    <p className="text-md text-[#666666]">
                      *โดยจะเป็นตามข้อกำหนดการใช้งาน
                    </p>
                    {/* <RiVerifiedBadgeFill size="24" className="text-green-500" /> */}
                  </div>
                </div>

                <div className="flex h-auto max-w-[350px] flex-grow flex-col rounded-xl border border-gray-300 bg-white p-4 shadow-lg transition-all hover:translate-y-[-10px]">
                  <div className="flex flex-row gap-2">
                    {/* <FaThumbsUp size="32" /> */}
                    <p className="text-2xl font-semibold">คุณภาพ</p>
                  </div>
                  <hr className="mt-2 text-gray-500" />
                  <p className="text-md mt-2 text-[#666666]">
                    ให้บริการโดย RDCW
                    ที่มีประสบการณ์ด้านเว็บไซต์และแพลทฟอร์มมามากกว่า 3 ปี
                  </p>
                  <div className="mt-11 flex flex-row items-center justify-between gap-2">
                    <p className="text-md text-[#666666]">
                      *โดยจะเป็นตามข้อกำหนดการใช้งาน
                    </p>
                    {/* <RiVerifiedBadgeFill size="24" className="text-green-500" /> */}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center justify-center p-16">
              <Image
                src="/images/image.png"
                alt="mid"
                width={1000}
                height={900}
                quality={100}
                className="h-[200px] w-[1000px] rounded-xl md:h-[500px] md:w-[1000px]"
              />
            </div> */}
          </div>
        </LandingLayout>
      </AppLayout>
    </>
  )
}

export default Home
