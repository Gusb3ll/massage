import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo, useRef } from 'react'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getMassager } from '@/services/massager'

const MassagerProfile = () => {
  const router = useRouter()

  const massagerId = useMemo(
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

  const vaccineModalRef = useRef<HTMLDialogElement>(null)
  const licenseModalRef = useRef<HTMLDialogElement>(null)

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
          <h1 className="mb-5 text-2xl font-bold">Massager Profile</h1>
          {massager ? (
            <div>
              {massager.massageImages[0] ? (
                <div className="flex h-32 items-center justify-center rounded-lg border border-black md:h-40 lg:h-80">
                  <Image
                    src={massager.massageImages[0] ?? '/default-avatar.png'}
                    alt="Massager"
                    width={500}
                    height={500}
                    className="h-full w-full items-center rounded-lg object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center rounded-lg border border-black bg-gray-100 md:h-40 lg:h-80">
                  <p>please upload your image</p>
                </div>
              )}
              <div className="flex flex-col justify-between md:flex-row">
                <div className="flex flex-row gap-3 p-3 pl-0 md:gap-10 md:p-6">
                  <Image
                    src={massager.profileImage ?? '/default-avatar.png'}
                    alt="Massager"
                    width={60}
                    height={60}
                    className="h-16 w-16 items-center rounded-full object-cover"
                    priority
                  />
                  <div className="flex flex-col text-lg font-semibold">
                    {massager.firstName}
                    <p className="text-sm font-normal">
                      country <br className="text-sm font-normal" /> 150 review
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold">rating</p>
                    <p className="mt-5 text-sm">using time</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:gap-0 lg:flex-row lg:gap-5">
                  <div className="md:mt-5">
                    <button
                      className="btn h-auto min-h-0 w-32 rounded-2xl bg-white p-2 text-center shadow-md hover:bg-[#9E6D54] hover:text-white"
                      onClick={() => vaccineModalRef.current?.showModal()}
                    >
                      Vaccine
                    </button>
                    <dialog ref={vaccineModalRef} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="text-lg font-bold">
                          Vaccine Certificates
                        </h3>
                        <Image
                          src={
                            massager.vaccineCertificates[0] ??
                            '/default-avatar.png'
                          }
                          alt="Massager"
                          width={60}
                          height={60}
                          className="h-16 w-16 items-center rounded-full object-cover"
                          priority
                        />
                        <p className="py-4">
                          {massager.vaccineCertificates?.join(', ') ||
                            'No certificates available'}
                        </p>
                      </div>
                    </dialog>
                  </div>
                  <div className="md:mt-5">
                    <button
                      className="btn h-auto min-h-0 w-48 rounded-2xl bg-white p-2 text-center shadow-md hover:bg-[#9E6D54] hover:text-white"
                      onClick={() => licenseModalRef.current?.showModal()}
                    >
                      Professional license
                    </button>
                    <dialog ref={licenseModalRef} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="text-lg font-bold">
                          Professional License
                        </h3>
                        <Image
                          src={
                            massager.certificates[0] ?? '/default-avatar.png'
                          }
                          alt="Massager"
                          width={60}
                          height={60}
                          className="h-16 w-16 items-center rounded-full object-cover"
                          priority
                        />
                        <p className="py-4">
                          {massager.vaccineCertificates ||
                            'No license available'}
                        </p>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
              <hr className="border-1 mt-5 border-[#854523] opacity-100 md:mt-0" />
              <div className="flex flex-col p-2 pl-0">
                <p className="text-lg font-semibold">
                  <span>About</span> {massager.firstName}
                </p>
                <div className="mt-4 flex flex-row gap-3">
                  <p className="w-60 rounded-xl border border-[#A9A9A9] p-1.5 text-center">
                    {massager.firstName} {massager.lastName}
                  </p>
                  <p className="w-40 rounded-xl border border-[#A9A9A9] p-1.5 text-center">
                    {massager.gender}
                  </p>
                  <p className="w-40 rounded-xl border border-[#A9A9A9] p-1.5 text-center">
                    Age
                  </p>
                </div>
                <p className="max-w-lg p-3 pl-0">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aspernatur recusandae omnis officiis impedit placeat optio
                  soluta tempora odit rerum molestiae, maxime cum fuga quibusdam
                  magni laborum temporibus voluptatibus, voluptates explicabo ut
                  at repudiandae commodi ipsam? Vel magni error similique
                  officia?
                </p>
                <p className="text-md mt-2 font-semibold">Service area</p>
                <p className="w-40 rounded-xl border border-[#A9A9A9] p-1.5 text-center">
                  Service area
                </p>
                <p className="text-md mt-2 font-semibold">Languages</p>
                <div className="flex flex-row">
                  <p className="mt-2 w-full max-w-sm rounded-xl border border-[#A9A9A9] p-1.5 text-center">
                    {massager.languages?.join(' , ') ||
                      'No languages specified'}
                  </p>
                </div>
                <p className="text-md mt-2 font-semibold">Skills</p>
                <div className="flex flex-col justify-between lg:flex-row">
                  <p className="flex w-full max-w-xl justify-center rounded-xl border border-[#A9A9A9] p-1.5 text-center">
                    {massager.skills?.join(' , ') || 'No skills specified'}
                  </p>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary mt-4 w-32 border-0 bg-[#9E6D54] text-lg font-normal text-white lg:mt-0"
                    >
                      Select
                    </button>
                  </div>
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

export default MassagerProfile
