import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'sonner'
import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getProperty } from '@/services/property'

const PropertyLocation = () => {
  const router = useRouter()

  const propertyId = React.useMemo(
    () => router.query.id as string | undefined,
    [router.query.id],
  )

  const {
    data: property,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getProperty', propertyId],
    queryFn: () => getProperty(propertyId!),
    enabled: !!propertyId,
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
          <h1 className="mb-5 text-2xl font-bold">Property Location</h1>
          {property ? (
            <div>
              <p>
                <span>Name:</span> {property.name}
              </p>
              <p>
                <span>Email:</span> {property.price}
              </p>
              <p>
                <span>languages:</span> {property.rooms}
              </p>
              <p>
                <span>gender:</span> {property.description}
              </p>
              <p>
                <span>skills:</span> {property.roomHeight}
              </p>
              <p>
                <span>skills:</span> {property.roomWidth}
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

export default PropertyLocation
