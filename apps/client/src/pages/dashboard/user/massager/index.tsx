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
                className="flex h-[310px] w-full flex-col rounded-xl border bg-white shadow-md"
              >
                <Image
                  src={m.profileImage ?? '/default-avatar.png'}
                  alt="Massager"
                  width={100}
                  height={100}
                  className="h-48 w-full rounded-t-lg object-cover"
                  priority
                />
                <div className="flex flex-row justify-between gap-1 p-2 text-[#97471d]">
                  <div className="flex flex-col gap-1">
                    <p className="text-md font-semibold">
                      {m.firstName} {m.lastName}
                    </p>
                    <div className="flex flex-row gap-1 text-sm font-semibold text-black">
                      <TfiLocationPin className="h-5" />
                      <p>Location</p>
                    </div>
                    {m.address}
                  </div>
                  <p className="text-md font-semibold text-black">{m.gender}</p>
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
