import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { TfiLocationPin } from 'react-icons/tfi'
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
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map(property => (
              <Link
                key={property.id}
                href={`/dashboard/user/location/${property.id}`}
                className="flex h-auto w-full flex-col rounded-xl border bg-white shadow-md"
              >
                <Image
                  src={property.images?.[0] ?? '/default-avatar.png'}
                  alt="Property"
                  width={100}
                  height={100}
                  className="h-48 w-full rounded-t-lg object-cover"
                  priority
                />
                <div>
                  <div className="flex flex-row justify-between gap-1 overflow-hidden p-2 md:flex-col lg:flex-row">
                    <div className="flex flex-col">
                      <p className="text-md font-semibold text-[#97471d]">
                        {property.name || ''}
                      </p>
                      <div className="mt-1 flex text-sm font-semibold text-black">
                        <TfiLocationPin className="h-5" />
                        <p className="md: w-full max-w-32 truncate lg:max-w-20 xl:max-w-28">
                          {property.address || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <p className="h-[50%] rounded-md border border-[#a98a7a] p-1 text-sm font-semibold md:w-20 lg:w-auto">
                      {property.price} Bath
                    </p>
                  </div>
                  <div className="flex justify-end p-2">
                    <p className="font-semibold">
                      Rating{' '}
                      <span className="text-sm text-stone-400">
                        (Reviewtime)
                      </span>
                    </p>
                  </div>
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
