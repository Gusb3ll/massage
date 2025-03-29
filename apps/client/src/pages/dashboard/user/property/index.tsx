import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { TfiLocationPin } from 'react-icons/tfi'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getProperties } from '@/services/property'

const Location = () => {
  const { data: properties } = useQuery({
    queryKey: ['property'],
    queryFn: () => getProperties(),
  })

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="flex w-full flex-col gap-4 rounded-lg border p-8 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-semibold">Properties</h1>
            <label className="input input-[#C5C5C5] input-bordered flex w-full items-center gap-2 bg-white md:w-fit">
              <FaMagnifyingGlass />
              <input
                type="text"
                placeholder="Search"
                // onChange={e => setSearch(e.target.value)}
              />
            </label>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties?.map(p => (
              <Link
                key={p.id}
                href={`/dashboard/user/property/${p.id}`}
                className="flex h-full w-full flex-col rounded-xl border bg-white shadow-md"
              >
                <Image
                  src={p.images[0]}
                  alt={p.id}
                  width={256}
                  height={256}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex flex-col gap-4">
                    <p className="text-md font-semibold text-[#97471d]">
                      {p.name}
                    </p>
                    <div className="flex flex-row gap-1">
                      <TfiLocationPin size="16" />
                      <p className="line-clamp-2 max-w-[220px] text-sm font-semibold">
                        {p.address}
                      </p>
                    </div>
                    <button className="btn bg-primary/80 hover:bg-primary/90 text-white">
                      View location
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default Location
