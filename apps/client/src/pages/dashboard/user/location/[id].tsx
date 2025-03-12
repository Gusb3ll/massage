import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
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

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>
  }

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
              <Image
                src={property.owner.profileImage ?? '/default-avatar.png'}
                alt="Massager"
                width={100}
                height={100}
                className="h-24 w-24 rounded-full object-cover"
                priority
              />
              <Image
                src={property.images?.[0] ?? '/default-avatar.png'}
                alt="Massager"
                width={100}
                height={100}
                className="h-24 w-24 rounded-full object-cover"
                priority
              />
              <p>
                <span>skills:</span> {property.owner.firstName}
              </p>
              <p>
                <span>skills:</span> {property.owner.lastName}
              </p>
              <p>
                <span>skills:</span> {property.address}
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
