import { createRef } from 'react'

import { Massager } from '@/services/massager'

export const vaccineModalRef = createRef<HTMLDialogElement>()

type VaccineModalProps = {
  massager: Massager
}

const VaccineModal: React.FC<VaccineModalProps> = ({ massager }) => {
  return (
    <>
      <dialog ref={vaccineModalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Vaccine Certificates</h3>
          {massager.vaccineCertificates.length > 0 ? (
            <>
              <img
                src={massager.vaccineCertificates[0] ?? '/default-avatar.png'}
                alt="Vaccine Certificates"
                className="h-[300px] w-full items-center rounded-lg object-cover"
              />
            </>
          ) : (
            <div className="mt-2 flex h-[200px] items-center justify-center rounded-lg border border-dashed border-gray-300">
              Massager has no certificates
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default VaccineModal
