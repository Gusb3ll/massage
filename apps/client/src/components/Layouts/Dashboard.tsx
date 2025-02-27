import Image from 'next/image'
import Link from 'next/link'
import { FaAlignJustify } from 'react-icons/fa6'

import Sidebar from '../Sidebar'

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="flex w-full items-center justify-between border-2 border-white border-opacity-10 bg-white p-2 px-4 py-2 shadow-md md:hidden">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Link href="/" className="flex flex-row items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={90}
              height={40}
              className="h-[52px] w-[52px] md:h-[90px] md:w-[90px]"
            />
            <p className="mt-1 border-l border-gray-300 pl-2 text-sm font-bold md:text-sm">
              Nami Massage
            </p>
          </Link>
        </h2>
        <label
          htmlFor="sidebar-drawer"
          aria-label="Open"
          className="btn btn-ghost drawer-button flex items-center justify-center"
        >
          <FaAlignJustify className="h-5 w-5" />
        </label>
      </div>

      <div className="flex min-h-screen flex-row gap-0">
        <Sidebar />
        <div className="w-full p-4 md:p-8">{children}</div>
      </div>
    </>
  )
}

export default DashboardLayout
