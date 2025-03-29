import 'react-image-gallery/styles/css/image-gallery.css'
import { GoogleMapsEmbed } from '@next/third-parties/google'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ImageGallery from 'react-image-gallery'

import { isBookingActiveAtom, propertyIdAtom } from '@/atoms'
import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getProperty } from '@/services/property'

const PropertyLocation = () => {
  const router = useRouter()
  const propertyId = router.query.id as string | undefined
  const [, setBookingPropertyId] = useAtom(propertyIdAtom)
  const [, setIsBookingActive] = useAtom(isBookingActiveAtom)

  const [isLoading, setIsLoading] = useState(true)

  const { data: property } = useQuery({
    queryKey: ['getProperty', propertyId],
    queryFn: () => getProperty(propertyId!),
    enabled: !!propertyId,
  })

  return (
    property && (
      <AppLayout>
        <DashboardLayout>
          <div className="flex w-full flex-col gap-4 rounded-lg border p-8 shadow-lg">
            <h1 className="text-3xl font-semibold">{property.name}</h1>
            <ImageGallery
              items={property.images.map(i => ({
                original: i,
                thumbnail: i,
              }))}
              showPlayButton={false}
              additionalClass={`${isLoading ? 'hidden' : ''}`}
              onImageLoad={() => {
                setTimeout(() => {
                  setIsLoading(false)
                }, 100)
              }}
            />
            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="flex w-full flex-col rounded-lg border p-3">
                <div className="flex flex-col justify-between xl:flex-row xl:gap-[255px]">
                  <div className="flex flex-row gap-3">
                    <p className="w-auto max-w-28 rounded-lg border p-1 text-center">
                      {property.rooms} room
                    </p>
                    <p className="w-auto max-w-28 rounded-lg border p-1 text-center">
                      width {property.roomHeight}
                    </p>
                    <p className="w-auto max-w-28 rounded-lg border p-1 text-center">
                      height {property.roomHeight}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex flex-row items-center gap-4">
                  <Image
                    src={property.owner.profileImage}
                    alt="Massager"
                    width={100}
                    height={100}
                    className="h-14 w-14 rounded-full object-cover"
                    priority
                  />
                  <div className="flex flex-col gap-0 md:flex-row md:gap-2">
                    <p className="text-md font-semibold md:text-lg">
                      {property.owner.firstName}
                    </p>
                    <p className="text-md font-semibold md:text-lg">
                      {property.owner.lastName.slice(0, 1).toUpperCase()}.
                    </p>
                  </div>
                </div>
                <p className="mt-2 w-full max-w-xl">{property.description}</p>
                <div className="mt-4 flex flex-row items-center gap-2">
                  <p className="text-xl">Rent Price:</p>
                  <span className="mt-0.5 text-xl font-semibold">
                    {property.price}฿
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 xl:flex-row">
              <GoogleMapsEmbed
                apiKey="AIzaSyDtnLBip1ffDwaGa2REm7NQphZKvWqATdo"
                mode="search"
                height={400}
                width="100%"
                q="KMUTNB"
                region="TH"
              />
              <button
                className="btn bg-primary/80 hover:bg-primary/90 mt-4 self-end px-8 text-white lg:mt-0"
                onClick={() => {
                  setBookingPropertyId(property.id)
                  setIsBookingActive(true)
                  router.push('/dashboard/user/booking')
                }}
              >
                Select
              </button>
            </div>
          </div>
        </DashboardLayout>
      </AppLayout>
    )
  )
}

export default PropertyLocation
