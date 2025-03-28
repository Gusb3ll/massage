import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

import SidebarItem from './Item'
import {
  MASSAGER_ROUTES,
  PROPERTY_OWNER_ROUTES,
  USER_ROUTES,
} from './constants'

const SidebarMobile = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className="drawer-side z-10">
      <label
        htmlFor="sidebar-drawer"
        aria-label="Close"
        className="drawer-overlay"
      />
      <div className="h-full w-60 bg-white">
        <div className="flex h-full flex-col justify-between px-6 py-8">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex flex-row items-center gap-3">
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
                {session?.user.role === 'USER' &&
                  USER_ROUTES.map((r, i) => (
                    <SidebarItem
                      key={`user-${i}`}
                      title={r.title}
                      route={r.route}
                      currentRoute={router.pathname}
                      icon={r.icon}
                    />
                  ))}

                {session?.user.role === 'MASSAGER' &&
                  MASSAGER_ROUTES.map((r, i) => (
                    <SidebarItem
                      key={`massager-${i}`}
                      title={r.title}
                      route={r.route}
                      currentRoute={router.pathname}
                      icon={r.icon}
                    />
                  ))}

                {session?.user.role === 'PROPERTY_OWNER' &&
                  PROPERTY_OWNER_ROUTES.map((r, i) => (
                    <SidebarItem
                      key={`owner-${i}`}
                      title={r.title}
                      route={r.route}
                      currentRoute={router.pathname}
                      icon={r.icon}
                    />
                  ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              signOut({ redirect: false })
              router.push('/')
            }}
            className="btn bg-primary/80 hover:bg-primary/90 -mb-4 w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default SidebarMobile
