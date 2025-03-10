import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { toast } from 'sonner'
import React, { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getMassagers } from '@/services/massager'
import Link from 'next/link'

const Massager = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const {
    data: massagers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['massager'],
    queryFn: getMassagers,
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
    toast.error('Failed to load massager data')
    return (
      <div className="text-center text-red-500">
        Error loading massager data
      </div>
    )
  }

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="w-full rounded-lg border bg-white p-10 shadow-lg">
          <h1 className="mb-5 text-2xl font-bold">Massagers</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {massagers.map(massager => (
              <Link
                key={massager.id}
                href={`/dashboard/user/massager/${massager.id}`}
                className="flex w-full max-w-xs flex-col items-center rounded-lg border bg-white p-5 shadow-md sm:w-[48%] md:w-[30%] lg:w-[22%]"
              >
                <Image
                  src={massager.profileImage ?? '/default-avatar.png'}
                  alt="Massager"
                  width={100}
                  height={100}
                  className="h-24 w-24 rounded-full object-cover"
                  priority
                />
                <div className="flex flex-col items-center gap-1">
                  <h3 className="mt-3 text-lg font-semibold">
                    {massager.firstName || 'Unknown'} {massager.lastName || ''}
                  </h3>
                  <h3 className="text-md text-gray-600">
                    {massager.gender || 'Unknown'}
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

export default Massager
