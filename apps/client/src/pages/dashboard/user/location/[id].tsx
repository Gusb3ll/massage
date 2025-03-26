import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo, useRef } from 'react'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getProperty } from '@/services/property'

const PropertyLocation = () => {
  const router = useRouter()

  const propertyId = useMemo(
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

  const showallimg = useRef<HTMLDialogElement>(null)

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
        <div className="w-full rounded-lg bg-white p-16 pt-10 shadow-xl">
          <h1 className="mb-5 text-2xl font-bold">Property Location</h1>
          {property ? (
            <div>
              {property.images.length < 6 ? (
                <div>
                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="flex h-[167px] w-full items-center justify-center overflow-hidden rounded-lg md:h-auto md:max-h-[350px] md:min-w-full xl:min-w-[400px]">
                      <Image
                        src={property.images[0]}
                        alt="Image 1"
                        width={200}
                        height={200}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="hidden flex-col gap-4 xl:flex">
                      <div className="flex h-[167px] w-72 items-center justify-center overflow-hidden rounded-lg border">
                        <Image
                          src={property.images[1]}
                          alt="Image 1"
                          width={200}
                          height={200}
                          className="w-full"
                        />
                      </div>
                      <div className="flex h-[167px] w-72 items-center justify-center overflow-hidden rounded-lg border">
                        <Image
                          src={property.images[2]}
                          alt="Image 1"
                          width={200}
                          height={200}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 xl:flex-col">
                      <div className="flex h-24 w-80 items-center justify-center overflow-hidden rounded-lg border md:h-[150px] lg:h-[167px] lg:w-full lg:min-w-72">
                        <Image
                          src={property.images[3]}
                          alt="Image 1"
                          width={200}
                          height={200}
                          className="h-full w-full lg:h-auto"
                        />
                      </div>
                      <div className="flex h-24 w-80 items-center justify-center overflow-hidden rounded-lg border md:h-[150px] lg:h-[167px] lg:w-full lg:min-w-72">
                        <Image
                          src={property.images[4]}
                          alt="Image 1"
                          width={200}
                          height={200}
                          className="h-full w-full lg:h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="flex h-[167px] w-full items-center justify-center overflow-hidden rounded-lg md:h-auto md:max-h-[350px] md:min-w-full xl:min-w-[400px]">
                      <Image
                        src={property.images[0]}
                        alt="Image 1"
                        width={200}
                        height={200}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="hidden flex-col gap-4 xl:flex">
                      <div className="flex h-[167px] w-72 items-center justify-center overflow-hidden rounded-lg border">
                        <Image
                          src={property.images[1]}
                          alt="Image 1"
                          width={200}
                          height={200}
                          className="w-full"
                        />
                      </div>
                      <div className="flex h-[167px] w-72 items-center justify-center overflow-hidden rounded-lg border">
                        <Image
                          src={property.images[2]}
                          alt="Image 1"
                          width={200}
                          height={200}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 xl:flex-col">
                      <div className="flex h-24 w-80 items-center justify-center overflow-hidden rounded-lg border md:h-[150px] lg:h-[167px] lg:w-full lg:min-w-72">
                        <Image
                          src={property.images[3]}
                          alt="Image 1"
                          width={200}
                          height={200}
                          className="h-full w-full lg:h-auto"
                        />
                      </div>
                      <div className="flex h-24 w-80 items-center justify-center overflow-hidden rounded-lg border hover:shadow-lg md:h-[150px] lg:h-[167px] lg:w-full lg:min-w-72">
                        <button
                          onClick={() => showallimg.current?.showModal()}
                          className="h-full w-full rounded-lg bg-black bg-opacity-20 bg-cover bg-center bg-blend-multiply"
                          style={{
                            backgroundImage: `url(${property.images[4]})`,
                          }}
                        >
                          <span className="hidden rounded-lg px-4 py-2 text-4xl font-semibold text-white drop-shadow-md xl:block">
                            + {property.images.length - 5}
                          </span>
                          <span className="block rounded-lg px-4 py-2 text-xl font-semibold text-white drop-shadow-md md:text-4xl xl:hidden">
                            View More
                          </span>
                        </button>
                        <dialog ref={showallimg} className="modal">
                          <div className="modal-box max-full p-15 max-w-4xl">
                            <h3 className="text-2xl font-semibold">
                              All location image
                            </h3>
                            <hr />
                            {property.images?.length > 0 && (
                              <div className="mt-2 grid grid-rows-1 gap-4 p-10 pb-2 pt-2 md:grid-cols-3 lg:grid-cols-3">
                                {property.images.map((image, index) => (
                                  <div
                                    key={index}
                                    className="relative h-[200px] w-full rounded xl:h-[250px] xl:w-[250px]"
                                  >
                                    <Image
                                      src={image}
                                      alt={`Property Image ${index}`}
                                      layout="fill"
                                      objectFit="cover"
                                      className="w-full rounded"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn w-40 bg-[#8a4724] text-lg font-semibold text-white hover:bg-[#6c371b]">
                                  Close
                                </button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 flex flex-col gap-4 xl:flex-row">
                <div className="flex w-full flex-col rounded-lg border p-3">
                  <div className="flex flex-col justify-between xl:flex-row xl:gap-[255px]">
                    <p className="text-2xl font-semibold">{property.name}</p>
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
                      src={property.owner.profileImage ?? '/default-avatar.png'}
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
                        {property.owner.lastName}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 w-full max-w-xl">{property.description}</p>
                  <p className="mt-2 text-xl font-semibold">Rent Price </p>
                  <span className="mt-2 w-32 rounded-lg border p-1 text-center text-base font-normal">
                    {property.price} Bath
                  </span>
                </div>
                <div className="w-full max-w-72 rounded-lg border">
                  <p className="p-3 text-lg font-semibold">
                    rewiew <span>กี่รอบ</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between xl:flex-row">
                <div className="mt-4 h-80 w-full max-w-2xl rounded-lg border border-stone-300 bg-[url('https://i.pinimg.com/736x/b9/7d/bc/b97dbcdeb574093286d02bfb33f55a6a.jpg')] bg-cover p-4">
                  <p className="rounded-xl border bg-white p-2">
                    {property.address}
                  </p>
                </div>
                <div className="mt-4 flex items-end justify-end xl:mt-0 xl:justify-normal">
                  <button className="h-12 w-36 rounded-xl bg-[#8a4724] text-lg font-semibold text-white hover:bg-[#6c371b]">
                    Select
                  </button>
                </div>
              </div>
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
