import { GoogleMapsEmbed } from '@next/third-parties/google'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { deleteProperty, getProperties } from '@/services/property'

const ITEMS_PER_PAGE = 1

const LocationIndex = () => {
  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getProperties({}),
  })

  const [currentPage, setCurrentPage] = useState(1)

  const deletePropertyMutation = useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: () => {
      refetch()
    },
  })

  const onDeleteProperty = async (id: string) => {
    try {
      await deletePropertyMutation.mutateAsync(id)
      toast.success('Property deleted successfully')
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    toast.error('Failed to load properties data')

    return <div>Error loading properties data</div>
  }

  const totalPages = Math.ceil((properties?.length ?? 0) / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems =
    properties?.slice(startIndex, startIndex + ITEMS_PER_PAGE) ?? []

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="flex w-full items-center justify-center">
          {properties.length === 0 ? (
            <div className="flex h-screen w-full items-center justify-center">
              <div className="flex h-[500px] w-full flex-col items-center justify-center rounded-lg border bg-gray-100 p-8">
                <p className="text-lg text-gray-500">
                  You don’t have a location
                </p>
                <p className="text-lg text-gray-500">Please add location</p>
                <button className="mt-5">
                  <Link href="/dashboard/property/location/create">
                    <p className="btn btn-primary">Add Location</p>
                  </Link>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="mt-7 w-full rounded-lg border p-10 shadow-lg">
                <h1 className="text-2xl font-bold">Property Locations</h1>
                <ul>
                  {currentItems.map(property => (
                    <li key={property.id} className="border-b py-4">
                      {property.images?.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                          {property.images.map((image, index) => (
                            <div
                              key={index}
                              className="relative h-32 w-full overflow-hidden rounded-lg shadow-md"
                            >
                              <Image
                                src={image}
                                alt={`Property Image ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:flew-row mt-10 flex w-full flex-col rounded-lg border p-10 shadow-lg">
                <h1 className="text-2xl font-bold">Property Information</h1>
                <hr className="mt-3" />
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <div className="flex w-full flex-col items-center justify-center">
                    {currentItems.map(property => (
                      <div
                        key={property.id}
                        className="w-full rounded-lg border bg-[#faf7f7] p-5 py-2"
                      >
                        <p className="text-gray-800">{property.address}</p>
                      </div>
                    ))}
                    <div className="mt-5 w-full">
                      <GoogleMapsEmbed
                        apiKey="AIzaSyDtnLBip1ffDwaGa2REm7NQphZKvWqATdo"
                        mode="search"
                        height={400}
                        width="100%"
                        q="KMUTNB"
                        region="TH"
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-col rounded-lg border bg-[#faf7f7] p-5">
                    {currentItems.map(property => (
                      <div key={property.id} className="gap-4 py-2">
                        <h2 className="text-xl font-semibold">
                          {property.name}
                        </h2>

                        <p className="mt-5 text-gray-800">
                          Price : {property.price}
                        </p>
                        <p className="text-gray-800">
                          Rooms : {property.rooms}
                        </p>
                        <p className="text-gray-800">
                          Size : {property.roomWidth} m × {property.roomHeight}{' '}
                          m
                        </p>
                        <p className="text-gray-600">{property.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  {currentItems.map(property => (
                    <div
                      key={property.id}
                      className="flex w-full justify-end gap-2"
                    >
                      <button
                        className="btn btn-sm btn-error flex items-center gap-1 text-white hover:bg-red-500"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            'คุณต้องการลบบัญชีนี้ใช่หรือไม่?',
                          )
                          if (confirmDelete) {
                            onDeleteProperty(property.id)
                          }
                        }}
                      >
                        <p className="text-md block">Delete</p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center">
                {totalPages > 1 && (
                  <div className="mt-4 flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`rounded px-3 py-1 ${
                          currentPage === i + 1
                            ? 'bg-primary text-white'
                            : 'bg-gray-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default LocationIndex
