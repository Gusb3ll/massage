import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaMagnifyingGlass } from 'react-icons/fa6'

import { getBookings } from '@/services/booking'

import CreateBookingModal from './Modal/Create'

const UserBookingScene = () => {
  const router = useRouter()

  const { data: bookings, refetch } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBookings(),
  })

  return (
    <>
      <CreateBookingModal onCreate={() => refetch()} />
      <div className="flex w-full flex-col gap-4 rounded-lg border p-8 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-semibold">Bookings</h1>
          <label className="input input-[#C5C5C5] input-bordered flex w-full items-center gap-2 bg-white md:w-fit">
            <FaMagnifyingGlass />
            <input
              type="text"
              placeholder="Search"
              // onChange={e => setSearch(e.target.value)}
            />
          </label>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          {bookings?.map(b => (
            <div
              key={b.id}
              className="flex items-center gap-4 rounded-lg border p-4 shadow-md"
            >
              <Image
                src={b.massager.profileImage}
                alt={b.massager.firstName}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex flex-grow flex-col gap-1">
                <h2 className="text-lg font-semibold">
                  {b.massager.firstName} {b.massager.lastName}
                </h2>
                <p className="text-sm text-gray-600">{b.property.address}</p>
                <span className="text-sm font-medium capitalize text-blue-600">
                  {b.status.replace('_', ' ').toLowerCase()}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() =>
                    router.push(`/dashboard/user/booking/${b.id}/chat`)
                  }
                >
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UserBookingScene
