import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
// import { TfiLocationPin } from 'react-icons/tfi'
import { useDebounce } from 'use-debounce'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getMassagers } from '@/services/massager'

const UserMassager = () => {
  const [search, setSearch] = useState('')
  const [searchValue] = useDebounce(search, 250)

  const { data: massagers } = useQuery({
    queryKey: ['massager', searchValue],
    queryFn: () => getMassagers({ search: searchValue }),
    refetchOnWindowFocus: false,
  })

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="flex w-full flex-col gap-4 rounded-lg border p-8 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-semibold">Massagers</h1>
            <label className="input input-[#C5C5C5] input-bordered flex w-full items-center gap-2 bg-white md:w-fit">
              <FaMagnifyingGlass />
              <input
                type="text"
                placeholder="Search"
                onChange={e => setSearch(e.target.value)}
              />
            </label>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {massagers?.map(m => (
              <Link
                key={m.id}
                href={`/dashboard/user/massager/${m.id}`}
                className="flex h-full w-full flex-col rounded-xl border bg-white shadow-md"
              >
                <Image
                  src={m.profileImage}
                  alt={m.id}
                  width={256}
                  height={256}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-md text-primary font-semibold">
                        {m.firstName} {m.lastName}
                      </p>
                      {/* <div className="line-clamp-1 flex flex-row gap-1 truncate text-sm font-semibold text-black">
                        <TfiLocationPin className="h-5" />
                        {m.address}
                      </div> */}
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
