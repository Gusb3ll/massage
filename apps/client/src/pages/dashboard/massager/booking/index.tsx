import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import {
  cancelBooking,
  confirmBooking,
  getMassagerBooking,
} from '@/services/booking'

const MassagerBooking = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [searchValue] = useDebounce(search, 250)

  const { data: bookings, refetch } = useQuery({
    queryKey: ['booking', searchValue],
    queryFn: () => getMassagerBooking({ search: searchValue }),
  })

  const cancelBookingMutation = useMutation({
    mutationFn: (id: string) => cancelBooking(id),
    onSuccess: () => {
      refetch()
      toast.success('Booking canceled')
    },
    onError: e => toast.error(e.message),
  })
  const confirmBookingMutation = useMutation({
    mutationFn: (id: string) => confirmBooking(id),
    onSuccess: () => {
      refetch()
      toast.success('Booking confirmed')
    },
    onError: e => toast.error(e.message),
  })

  return (
    <AppLayout>
      <DashboardLayout>
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
                <div className="flex flex-grow flex-col gap-1">
                  <h2 className="text-lg font-semibold">
                    {b.user.firstName} {b.user.lastName}
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
                      b.status === 'CONFIRMED' ||
                      b.status === 'COMPLETED'
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
                      b.status === 'CONFIRMED' ||
                      b.status === 'COMPLETED' ||
                      b.status === 'CANCELED'
                    }
                    className="disabled:btn-disabled btn bg-primary/80 hover:bg-primary/90 rounded-lg px-4 py-2 text-white"
                    onClick={() =>
                      router.push(`/dashboard/user/booking/${b.id}/chat`)
                    }
                  >
                    Chat
                  </button>
                  <button
                    disabled={
                      cancelBookingMutation.isPending ||
                      b.status !== 'PENDING_MASSAGER'
                    }
                    className="disabled:btn-disabled btn btn-success rounded-lg px-4 py-2 text-white"
                    onClick={() => {
                      const confirm = window.confirm('Confirm this booking?')
                      if (confirm) {
                        confirmBookingMutation.mutate(b.id)
                      }
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default MassagerBooking
