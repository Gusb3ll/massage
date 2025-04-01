import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'

import { cancelBooking, getBookings } from '@/services/booking'
import { createPayment } from '@/services/payment'

import CreateBookingModal from './Modal/Create'

const UserBookingScene = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [searchValue] = useDebounce(search, 250)

  const { data: bookings, refetch } = useQuery({
    queryKey: ['booking', searchValue],
    refetchOnWindowFocus: false,
    queryFn: () => getBookings({ search: searchValue }),
  })

  const cancelBookingMutation = useMutation({
    mutationFn: (id: string) => cancelBooking(id),
    onSuccess: () => {
      refetch()
      toast.success('Booking cancelled successfully')
    },
    onError: e => toast.error(e.message),
  })

  const createPaymentMutation = useMutation({
    mutationFn: (id: string) => createPayment(id),
    onSuccess: res => {
      refetch()
      router.replace(res.paymentLink)
    },
    onError: e => toast.error(e.message),
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
              onChange={e => setSearch(e.target.value)}
            />
          </label>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          {bookings?.map(b => (
            <div
              key={b.id}
              className="flex flex-col items-center gap-4 rounded-lg border p-4 shadow-md lg:flex-row"
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
                <span className="flex flex-row gap-1">
                  <p>{dayjs(b.bookingDate).format('DD/MM/YYYY HH:mm')}</p>-
                  <p className="text-primary capitalize">
                    {b.status.replace('_', ' ').toLowerCase()}
                  </p>
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  disabled={
                    cancelBookingMutation.isPending ||
                    b.status === 'CANCELED' ||
                    b.status === 'CONFIRMED'
                  }
                  className="btn btn-error rounded-lg px-4 py-2 text-white"
                  onClick={() => {
                    const confirm = window.confirm('Cancel this booking?')
                    if (confirm) {
                      cancelBookingMutation.mutate(b.id)
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={
                    cancelBookingMutation.isPending ||
                    b.status === 'CANCELED' ||
                    b.status === 'COMPLETED'
                  }
                  className="disabled:btn-disabled btn rounded-lg bg-[#9E6D54] px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() =>
                    router.push(`/dashboard/user/booking/${b.id}/chat`)
                  }
                >
                  Chat
                </button>
                <button
                  disabled={b.status !== 'PENDING_PAYMENT'}
                  className="disabled:btn-disabled btn btn-success rounded-lg px-4 py-2 text-white"
                  onClick={() => {
                    createPaymentMutation.mutate(b.id, {
                      onSuccess: () => {
                        setTimeout(() => {
                          router.push(`/success`)
                        }, 500)
                      },
                    })
                  }}
                >
                  Payment
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
