import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import React from 'react'
import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getMassagers } from '@/services/massager'

const Massager = () => {
  const { data: session } = useSession()
  const {
    data: massagers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['massager'],
    queryFn: getMassagers,
  })

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
  console.log('Session Data:', session)

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="w-full rounded-lg border bg-white p-10 shadow-lg">
          <h1 className="mb-5 text-2xl font-bold">Massagers</h1>

          <div className="flex flex-wrap justify-center gap-6">
            {massagers.map(massager => (
              <div
                key={massager.id}
                className="flex w-full max-w-xs flex-col items-center rounded-lg border bg-white p-5 shadow-md sm:w-[48%] md:w-[30%] lg:w-[22%]"
              >
                <Image
                  src={session?.user?.profileImage || '/default-avatar.png'}
                  alt="Massager"
                  width={100}
                  height={100}
                  className="h-24 w-24 rounded-full object-cover"
                />
                <h3 className="mt-3 text-lg font-semibold">
                  {session?.user?.name || 'Unknown'}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default Massager
