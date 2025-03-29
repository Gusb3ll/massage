import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { createRef, useEffect } from 'react'
import { FaStar } from 'react-icons/fa6'

import { isBookingActiveAtom, massagerIdAtom, propertyIdAtom } from '@/atoms'
import { getMassager } from '@/services/massager'
import { getProperty } from '@/services/property'

export const createBookingModalRef = createRef<HTMLDialogElement>()

const CreateBookingModal = () => {
  const [isBookingActive, setIsBookingActive] = useAtom(isBookingActiveAtom)
  const [massagerId, setMassagerId] = useAtom(massagerIdAtom)
  const [propertyId, setPropertyId] = useAtom(propertyIdAtom)

  const { data: massager } = useQuery({
    queryKey: ['booking', 'massager', massagerId],
    queryFn: () => getMassager(massagerId!),
    enabled: !!massagerId && isBookingActive,
  })
  const { data: property } = useQuery({
    queryKey: ['booking', 'property', propertyId],
    queryFn: () => getProperty(propertyId!),
    enabled: !!propertyId && isBookingActive,
  })

  useEffect(() => {
    if (isBookingActive) {
      createBookingModalRef.current?.showModal()
    } else {
      createBookingModalRef.current?.close()
    }
  }, [isBookingActive])

  return (
    <dialog ref={createBookingModalRef} className="modal">
      <div className="modal-box flex flex-col gap-4">
        <h3 className="text-lg font-bold">New booking</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Massager</p>
            {massager ? (
              <>
                <div className="flex flex-row gap-8">
                  <Image
                    src={massager.profileImage}
                    alt={massager.id}
                    height={256}
                    width={256}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">
                      {massager.firstName}{' '}
                      {massager.lastName.slice(0, 1).toUpperCase()}.
                    </p>
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-lg font-bold">4/5</p>
                      <FaStar />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/dashboard/user/massager"
                className="hover:border-primary hover:text-primary flex h-[100px] items-center justify-center rounded-lg border border-dashed text-black text-opacity-60 transition-all hover:opacity-100"
              >
                <p className="select-none">Select massager +</p>
              </Link>
            )}
          </div>
          <hr />
          <div className="flex flex-col gap-4">
            <p>Location</p>
            {property ? (
              <></>
            ) : (
              <Link
                href="/dashboard/user/property"
                className="hover:border-primary hover:text-primary flex h-[100px] items-center justify-center rounded-lg border border-dashed text-black text-opacity-60 transition-all hover:opacity-100"
              >
                <p className="select-none">Select location +</p>
              </Link>
            )}
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <div className="flex flex-row gap-2">
              <button
                type="button"
                className="btn bg-error/80 hover:bg-error/90 text-white"
                onClick={() => {
                  const confirm = window.confirm(
                    'Confirm cancel booking? All prgress will be lost.',
                  )
                  if (confirm) {
                    setMassagerId(null)
                    setPropertyId(null)
                    setIsBookingActive(false)
                    createBookingModalRef.current?.close()
                  }
                }}
              >
                Cancel
              </button>
              <button
                disabled={!(!!massagerId && !!propertyId)}
                className="btn bg-primary/80 hover:bg-primary/90 disabled:btn-disabled text-white"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default CreateBookingModal
