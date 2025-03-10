import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'sonner'
import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getMassager } from '@/services/massager'
import { useSession } from 'next-auth/react'

const MassagerProfile = () => {
  const router = useRouter()

  const massagerId = React.useMemo(
    () => router.query.id as string | undefined,
    [router.query.id],
  )

  const {
    data: massager,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getMassager', massagerId],
    queryFn: () => getMassager(massagerId!),
    enabled: !!massagerId,
  })

  if (isLoading) return <div className="text-center text-lg">Loading...</div>

  if (error) {
    toast.error('Failed to load massager data')
    return <div className="text-center text-red-500">Error loading data</div>
  }

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="w-full rounded-lg border bg-white p-10 shadow-lg">
          <h1 className="mb-5 text-2xl font-bold">Massager Profile</h1>
          {massager ? (
            <div>
              <p>
                <span>Name:</span> {massager.firstName}
              </p>
              <p>
                <span>Email:</span> {massager.lastName}
              </p>
              <p>
                <span>languages:</span> {massager.languages}
              </p>
              <p>
                <span>gender:</span> {massager.gender}
              </p>
              <p>
                <span>skills:</span> {massager.skills}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default MassagerProfile
