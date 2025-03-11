import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { TfiLocationPin } from 'react-icons/tfi'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getMassagers } from '@/services/massager'

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
        <div className="w-full rounded-lg border bg-white p-12 shadow-lg">
          <h1 className="ml-6 text-3xl font-bold">Massagers</h1>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {massagers.map(massager => (
              <Link
                key={massager.id}
                href={`/dashboard/user/massager/${massager.id}`}
                className="w-10% xl-[100%] flex h-[310px] w-full max-w-60 flex-col rounded-xl border bg-white shadow-md md:w-[40%] lg:w-[60%]"
              >
                <Image
                  src={massager.profileImage ?? '/default-avatar.png'}
                  alt="Massager"
                  width={100}
                  height={100}
                  className="h-48 w-full rounded-t-lg object-cover"
                  priority
                />
                <div className="flex flex-row justify-between gap-1 p-2 text-[#97471d]">
                  <div>
                    <p className="text-md font-semibold">
                      {massager.firstName || 'Unknown'}{' '}
                      {massager.lastName || ''}
                    </p>
                    <div className="mt-1 flex text-sm font-semibold text-black">
                      <TfiLocationPin className="h-5" />
                      <p>Location</p>
                    </div>
                  </div>
                  <p className="text-md font-semibold text-black">
                    {massager.gender || 'Unknown'}
                  </p>
                </div>
                <div className="flex justify-end p-2">
                  <p className="font-semibold">
                    Rating{' '}
                    <span className="text-sm text-stone-400">(Reviewtime)</span>
                  </p>
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
