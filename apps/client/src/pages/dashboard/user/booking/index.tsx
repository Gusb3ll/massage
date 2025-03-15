import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {bookings.map(booking => (
                <div key={booking.id} className="flex flex-col gap-4">
                  {booking.massager && (
                    <div className="rounded-lg border bg-gray-50 p-4 shadow-md">
                      <h2 className="mb-2 text-lg font-semibold">Massager</h2>
                      <Image
                        src={
                          booking.massager.profileImage ?? '/default-avatar.png'
                        }
                        alt="Image"
                        width={50}
                        height={50}
                        className="h-40 w-60 items-center rounded-md object-cover"
                      />
                      <p>
                        <span className="font-medium">Name:</span>{' '}
                        {booking.massager.firstName} {booking.massager.lastName}
                      </p>
                      <p>
                        <span className="font-medium">Gender:</span>{' '}
                        {booking.massager.gender}
                      </p>
                      <p>
                        <span className="font-medium">Age:</span>{' '}
                        {calculateAge(booking.massager.dateOfBirth)} years
                      </p>
                    </div>
                  )}
                  {booking.property && (
                    <div className="rounded-lg border bg-gray-50 p-4 shadow-md">
                      <h2 className="mb-2 text-lg font-semibold">Property</h2>
                      <Image
                        src={
                          booking.property?.images[0] ?? '/default-avatar.png'
                        }
                        alt="Image"
                        width={50}
                        height={50}
                        className="h-40 w-60 items-center rounded-md object-cover"
                      />
                      <p>
                        <span className="font-medium">Name:</span>{' '}
                        {booking.property?.name}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{' '}
                        {booking.property?.address}
                      </p>
                      <p>
                        <span className="font-medium">Rooms:</span>{' '}
                        {booking.property?.rooms}
                      </p>
                      <p>
                        <span className="font-medium">width:</span>{' '}
                        {booking.property?.roomWidth}
                      </p>
                      <p>
                        <span className="font-medium">height:</span>{' '}
                        {booking.property?.roomHeight}
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
