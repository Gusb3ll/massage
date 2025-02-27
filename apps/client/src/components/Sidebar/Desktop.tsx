import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { MdLogout } from 'react-icons/md'

import SidebarItem from './Item'
import { EMAIL_ROUTES } from './constants'

const SidebarDesktop = () => {
  const router = useRouter()

  return (
    <div className="drawer-content hidden h-full flex-col justify-between border border-gray-300 bg-white px-4 py-8 shadow-lg md:flex">
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex flex-row items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={90}
            height={40}
            className="h-[52px] w-[52px] md:h-[90px] md:w-[90px]"
          />
          <p className="text-xl font-bold">Nami Massage</p>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="mt-6 flex w-full flex-col gap-1">
            {EMAIL_ROUTES.map((r, i) => (
              <SidebarItem
                key={`email-${i}`}
                title={r.title}
                route={r.route}
                currentRoute={router.pathname}
                icon={r.icon}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <button
          onClick={() => {
            signOut({ redirect: false })
            router.push('/')
          }}
          className="btn btn-primary w-full text-white"
        >
          <MdLogout className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default SidebarDesktop
