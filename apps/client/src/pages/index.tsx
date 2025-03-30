import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { FaBoltLightning, FaThumbsUp } from 'react-icons/fa6'

import AppLayout from '@/components/Layouts/App'
import LandingLayout from '@/components/Layouts/Landing'

const Home = () => {
  const { data: session } = useSession()

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

            <div className="mt-14 flex flex-row flex-wrap justify-center gap-8 py-4 sm:flex-col md:gap-16">
              <h1 className="mx-4 text-center text-3xl font-semibold md:ml-20 md:text-left">
                Why should you use it?
              </h1>
              <div className="flex flex-wrap justify-center gap-5 sm:flex-row sm:gap-8 md:flex-row lg:flex-row">
                <div className="flex h-auto max-w-[350px] flex-grow flex-col rounded-xl border border-gray-300 bg-white p-4 py-8 shadow-lg transition-all hover:translate-y-[-10px]">
                  <div className="flex flex-row gap-2">
                    <FaBoltLightning size="32" />
                    <p className="text-2xl font-semibold">Convenient </p>
                  </div>
                  <hr className="mt-2 text-gray-500" />
                  <p className="text-md mt-2 text-[#666666]">
                    You can select the date, time, and location at your
                    convenience without having to search or call for an
                    appointment.
                  </p>
                </div>

                <div className="flex h-auto max-w-[350px] flex-grow flex-col rounded-xl border border-gray-300 bg-white p-4 py-8 shadow-lg transition-all hover:translate-y-[-10px]">
                  <div className="flex flex-row gap-2">
                    <FaStar size="32" />
                    <p className="text-2xl font-semibold">
                      More variety of choices
                    </p>
                  </div>
                  <hr className="mt-2 text-gray-500" />
                  <p className="text-md mt-2 text-[#666666]">
                    You can choose a masseuse based on experience or the type of
                    massage you prefer.
                  </p>
                </div>

                <div className="flex h-auto max-w-[350px] flex-grow flex-col rounded-xl border border-gray-300 bg-white p-4 py-8 shadow-lg transition-all hover:translate-y-[-10px]">
                  <div className="flex flex-row gap-2">
                    <FaThumbsUp size="32" />
                    <p className="text-2xl font-semibold">
                      Quality and safety{' '}
                    </p>
                  </div>
                  <hr className="mt-2 text-gray-500" />
                  <p className="text-md mt-2 text-[#666666]">
                    Booking websites usually screen masseuses with
                    certifications or standards, ensuring quality and safety in
                    the service.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/85 mt-10 h-[400px] w-full p-10">
              <div className="flex h-[330px] flex-col rounded-3xl border border-gray-300 bg-white p-4 shadow-lg">
                <div className="mt-9 flex flex-row items-center justify-center gap-4">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={76}
                    height={32}
                    className="h-[46px] w-[46px] md:h-[70px] md:w-[70px]"
                  />
                  <h2 className="flex items-center justify-center gap-2 text-4xl font-bold">
                    <span className="items-center text-3xl">Nami Massage</span>
                  </h2>
                </div>

                <h1 className="mt-5 text-center text-xl font-semibold">
                  If you wish to book a massage therapist for your wellness.
                </h1>
                <h1 className="mt-5 text-center text-xl font-semibold">
                  Let&apos;s use Nami Massage!
                </h1>

                <div className="mt-7 flex items-center justify-center gap-4">
                  <Link
                    href={session?.user ? '/dashboard' : '/register'}
                    className="btn rounded-2xl bg-[#000000] text-white hover:bg-black"
                  >
                    Let&apos;s get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </LandingLayout>
      </AppLayout>
    </>
  )
}

export default Home
