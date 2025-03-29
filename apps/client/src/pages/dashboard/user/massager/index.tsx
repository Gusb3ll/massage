import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { TfiLocationPin } from 'react-icons/tfi'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getMassagers } from '@/services/massager'

const UserMassager = () => {
  const { data: massagers } = useQuery({
    queryKey: ['massager'],
    queryFn: () => getMassagers(),
  })

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="flex w-full flex-col gap-4 rounded-lg border p-8 shadow-lg">
          <h1 className="text-3xl font-semibold">Massagers</h1>
          <hr />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {massagers?.map(m => (
              <Link
                key={m.id}
                href={`/dashboard/user/massager/${m.id}`}
                className="flex h-full w-full flex-col rounded-xl border bg-white shadow-md"
              >
                <Image
                  src={m.profileImage ?? '/default-avatar.png'}
                  alt="Massager"
                  width={256}
                  height={256}
                  className="h-48 w-full rounded-t-lg object-cover"
                  priority
                />
                <div className="4 flex flex-col gap-4 p-4">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-primary font-semibold">
                        {m.firstName} {m.lastName}
                      </p>
                      <div className="line-clamp-1 flex flex-row gap-1 truncate text-sm font-semibold text-black">
                        <TfiLocationPin className="h-5" />
                        <p>Location</p>
                      </div>
                      {m.address}
                    </div>
                    <p className="text-md font-semibold text-black">
                      {m.gender === 'FEMALE' ? 'Female' : 'Male'}
                    </p>
                  </div>
                  <button className="btn bg-primary/80 hover:bg-primary/90 text-white">
                    View profile
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default UserMassager
