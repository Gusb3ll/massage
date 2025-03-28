import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { IoMdCalendar, IoMdTime } from 'react-icons/io'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getBookings } from '@/services/booking'

const Booking = () => {
  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['booking'],
    queryFn: getBookings,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>
  }

  if (error) {
    toast.error('Failed to load booking data')

    return (
      <div className="text-center text-red-500">Error loading booking data</div>
    )
  }

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="w-full rounded-lg border bg-white p-6 shadow-lg">
          <h1 className="mb-5 text-2xl font-bold">Bookings</h1>
          {bookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {bookings.map(booking => (
                <div key={booking.id} className="flex flex-col gap-4">
                  {booking.massager && (
                    <div className="h-auto rounded-lg border bg-white p-4 shadow-md xl:h-72">
                      <h2 className="mb-2 text-2xl font-semibold">Massager</h2>
                      <div className="flex flex-col gap-5 xl:flex-row">
                        <Image
                          src={
                            booking.massager.profileImage ??
                            '/default-avatar.png'
                          }
                          alt="Image"
                          width={50}
                          height={50}
                          className="h-52 w-full items-center rounded-md object-cover xl:w-72"
                        />
                        <div className="flex flex-col gap-3">
                          <p className="text-xl font-semibold">
                            {booking.massager.firstName}{' '}
                            {booking.massager.lastName}
                          </p>
                          <div className="flex flex-row justify-between">
                            <p className="text-lg">
                              {calculateAge(booking.massager.dateOfBirth)} years
                            </p>
                            <p className="text-lg">{booking.massager.gender}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {booking.property && (
                    <div className="h-auto rounded-lg border bg-white p-4 shadow-md xl:h-72">
                      <h2 className="mb-2 text-2xl font-semibold">Property</h2>
                      <div className="flex flex-col gap-5 xl:flex-row">
                        <Image
                          src={
                            booking.property?.images[0] ?? '/default-avatar.png'
                          }
                          alt="Image"
                          width={50}
                          height={50}
                          className="h-52 w-full items-center rounded-md object-cover xl:w-72"
                        />
                        <div className="flex flex-col gap-3">
                          <p className="text-xl font-semibold">
                            {booking.property?.name}
                          </p>
                          <p>{booking.property?.address}</p>
                          <div className="flex flex-row gap-2">
                            <p>{booking.property?.rooms} room</p>
                            <p>
                              <span className="font-medium">width:</span>{' '}
                              {booking.property?.roomWidth}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-center xl:p-5">
                <div className="flex w-full flex-col justify-center gap-3 rounded-lg border bg-white p-5 shadow-md xl:max-w-sm">
                  <label className="form-control w-full">
                    <span className="label label-text font-semibold">Name</span>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="input input-[#C5C5C5] input-bordered cursor-default select-none bg-white opacity-80"
                    />
                  </label>
                  <label className="form-control w-full">
                    <span className="label label-text font-semibold">
                      Telephone
                    </span>
                    <input
                      type="text"
                      placeholder="Phone number"
                      className="input input-[#C5C5C5] input-bordered cursor-default select-none bg-white opacity-80"
                    />
                  </label>
                  <label className="form-control relative w-full xl:max-w-sm">
                    <span className="label label-text font-semibold">Time</span>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="select date"
                        className="input input-[#C5C5C5] input-bordered w-full cursor-default select-none bg-white opacity-80"
                      />
                      <button className="absolute right-5 top-1/2 -translate-y-1/2 transform border-none bg-transparent">
                        <IoMdCalendar className="h-6 w-6 text-[#8a4a27]" />
                      </button>
                    </div>
                  </label>
                  <label className="form-control relative w-full xl:max-w-sm">
                    <span className="label label-text font-semibold">Time</span>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="select time"
                        className="input input-[#C5C5C5] input-bordered w-full cursor-default select-none bg-white opacity-80"
                      />
                      <button className="absolute right-5 top-1/2 -translate-y-1/2 transform border-none bg-transparent">
                        <IoMdTime className="h-6 w-6 text-[#874826]" />
                      </button>
                    </div>
                  </label>
                  <div className="mt-4 flex justify-end lg:mt-7 xl:mt-9 xl:items-end">
                    <button
                      type="submit"
                      className="btn btn-primary h-10 w-28 border-0 bg-[#9d532c] text-white"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No bookings available</p>
          )}
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default Booking
