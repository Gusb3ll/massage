import 'react-image-gallery/styles/css/image-gallery.css'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import { useState } from 'react'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'
// import ImageGallery from 'react-image-gallery'

import { isBookingActiveAtom, massagerIdAtom } from '@/atoms'
import { getMassager } from '@/services/massager'

import LicenseModal, { licenseModalRef } from './Modal/License'
import VaccineModal, { vaccineModalRef } from './Modal/Vaccine'

// const images = [
//   {
//     original: 'https://picsum.photos/id/1018/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1018/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1015/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1019/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1019/250/150/',
//   },
// ]

const MassagerProfileScene = () => {
  const router = useRouter()
  const massagerId = router.query.id as string | undefined
  const [, setBookingMassagerId] = useAtom(massagerIdAtom)
  const [, setIsBookingActive] = useAtom(isBookingActiveAtom)

  // const [isLoading, setIsLoading] = useState(true)

  const { data: massager } = useQuery({
    queryKey: ['getMassager', massagerId],
    queryFn: () => getMassager(massagerId!),
    enabled: !!massagerId,
  })

  return (
    massager && (
      <>
        <VaccineModal massager={massager} />
        <LicenseModal massager={massager} />
        <div className="flex w-full flex-col gap-4 rounded-lg border p-8 shadow-lg">
          <h1 className="text-3xl font-semibold">Massager Profile</h1>
          <hr />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center rounded-lg border border-black md:h-40 lg:h-80">
              <Image
                src={massager.coverImage ?? '/default-avatar.png'}
                alt="Massager"
                width={1500}
                height={500}
                className="h-full w-full items-center rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-between md:flex-row">
              <div className="flex flex-row gap-3 p-3 pl-0 md:gap-10 md:p-6">
                <Image
                  src={massager.profileImage ?? '/default-avatar.png'}
                  alt="Massager"
                  width={60}
                  height={60}
                  className="h-16 w-16 items-center rounded-full object-cover"
                />
                <div className="flex flex-col text-lg font-semibold">
                  {massager.firstName}{' '}
                  {massager.lastName.slice(0, 1).toUpperCase()}.
                  <p className="text-sm font-normal">
                    Country <br /> 150 Reviews
                  </p>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-1">
                    <p className="text-lg font-semibold">Rating 4/5</p>
                    <FaStar />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 md:flex-row md:items-start">
                <button
                  className="btn bg-gray/80 hover:bg-gray/90 w-fit rounded-full shadow-md"
                  onClick={() => vaccineModalRef.current?.showModal()}
                >
                  Vaccine Certificates
                </button>
                <button
                  className="btn bg-gray/80 hover:bg-gray/90 w-fit rounded-full shadow-md"
                  onClick={() => licenseModalRef.current?.showModal()}
                >
                  License Certificates
                </button>
              </div>
            </div>
            <hr className="border-1 border-primary" />
            <div className="flex flex-col gap-4 p-2">
              <div className="flex flex-row gap-3">
                <div className="flex flex-row items-center gap-2 rounded-lg border border-[#A9A9A9] px-4 py-2">
                  <BsGenderAmbiguous size="20" />
                  <p className="text-md font-bold">
                    {massager.gender === 'MALE' ? 'Male' : 'Female'}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2 rounded-lg border border-[#A9A9A9] px-4 py-2">
                  <FaCalendarAlt size="18" />
                  <p className="text-md font-bold">
                    Age{' '}
                    {Math.abs(
                      dayjs(massager.dateOfBirth).diff(dayjs(), 'year'),
                    )}
                  </p>
                </div>
              </div>
              {/* {isLoading ? (
                <div className="skeleton h-[500px] w-full"></div>
              ) : (
                <></>
              )}
              <ImageGallery
                items={images}
                showPlayButton={false}
                showThumbnails={false}
                additionalClass={`${isLoading ? 'hidden' : ''}`}
                onImageLoad={() => {
                  setTimeout(() => {
                    setIsLoading(false)
                  }, 100)
                }}
              /> */}
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {massager.languages.length > 0 ? (
                    massager.languages.map((lang, index) => (
                      <p
                        key={index}
                        className="w-fit rounded-lg border border-[#A9A9A9] px-4 py-2 text-center"
                      >
                        {lang}
                      </p>
                    ))
                  ) : (
                    <p className="w-full max-w-lg rounded-lg border border-[#A9A9A9] py-2 text-center">
                      No languages specified
                    </p>
                  )}
                </div>

                <p className="text-md font-semibold">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {massager.skills.length > 0 ? (
                    massager.skills.map((skill, index) => (
                      <p
                        key={index}
                        className="w-fit rounded-lg border border-[#A9A9A9] px-4 py-2 text-center"
                      >
                        {skill}
                      </p>
                    ))
                  ) : (
                    <p className="w-full max-w-lg rounded-lg border border-[#A9A9A9] py-2 text-center">
                      No skills specified
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn bg-primary/80 hover:bg-primary/90 mt-4 self-end px-8 text-white lg:mt-0"
            onClick={() => {
              setBookingMassagerId(massager.id)
              setIsBookingActive(true)
              router.push('/dashboard/user/booking')
            }}
          >
            Select
          </button>
        </div>
      </>
    )
  )
}

export default MassagerProfileScene
