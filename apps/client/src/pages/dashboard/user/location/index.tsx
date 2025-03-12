import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getProperties } from '@/services/property'

const Location = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const {
    data: properties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['property'],
    queryFn: getProperties,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  if (!isClient) {
    return <div className="text-center text-lg">Loading...</div>
  }

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>
  }

  if (error) {
    toast.error('Failed to load property data')

    return (
      <div className="text-center text-red-500">
        Error loading property data
      </div>
    )
  }

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="w-full rounded-lg border bg-white p-10 shadow-lg">
          <h1 className="mb-5 text-2xl font-bold">Property</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {properties.map(properties => (
              <Link
                key={properties.id}
                href={`/dashboard/user/location/${properties.id}`}
                className="flex w-full max-w-xs flex-col items-center rounded-lg border bg-white p-5 shadow-md sm:w-[48%] md:w-[30%] lg:w-[22%]"
              >
                <Image
                  src={properties.images?.[0] ?? '/default-avatar.png'}
                  alt="Massager"
                  width={100}
                  height={100}
                  className="h-24 w-24 rounded-full object-cover"
                  priority
                />
                <div className="flex flex-col items-center gap-1">
                  <h3 className="mt-3 text-lg font-semibold">
                    {properties.price || 'Unknown'} {properties.name || ''}
                  </h3>
                  <h3 className="text-md text-gray-600">
                    {properties.address || 'Unknown'}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default Location
