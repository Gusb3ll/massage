import { createRef } from 'react'

import { Massager } from '@/services/massager'

export const licenseModalRef = createRef<HTMLDialogElement>()

type LicenseModalProps = {
  massager: Massager
}

const LicenseModal: React.FC<LicenseModalProps> = ({ massager }) => {
  return (
    <dialog ref={licenseModalRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">License Certificates</h3>
        {massager.certificates.length > 0 ? (
          <>
            <img
              src={massager.certificates[0] ?? '/default-avatar.png'}
              alt="License Certificates"
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
  )
}

export default LicenseModal
