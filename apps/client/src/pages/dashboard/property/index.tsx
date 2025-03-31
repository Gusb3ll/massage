import { LineChart } from '@mui/x-charts'
import { useQuery } from '@tanstack/react-query'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import { getPropertyStats } from '@/services/property'

const PropertyOwner = () => {
  const { data: usageStats = [] } = useQuery({
    queryKey: ['internal', 'getStats'],
    queryFn: () => getPropertyStats(),
    select: data => data || [],
  })

  const dateData = usageStats.map(s => s.date)
  const totalIncomeData = usageStats.map(s => s.totalIncome)

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="w-full rounded-lg border p-8 shadow-lg">
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold sm:text-3xl">Dashboard</p>
            <div className="flex w-full flex-col gap-4 md:flex-row">
              {usageStats.length > 0 && (
                <div className="flex w-full flex-row items-center justify-center gap-4">
                  <div className="flex w-full flex-col gap-4 md:flex-row">
                    <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-5 shadow-md">
                      <p className="text-lg font-semibold">Total Income</p>
                      <p className="text-primary text-2xl font-bold">
                        {usageStats[
                          usageStats.length - 1
                        ].totalIncomeAllDays.toLocaleString()}{' '}
                        ฿
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-5 shadow-md">
                      <p className="text-lg font-semibold">
                        Number of bookings
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        {usageStats[usageStats.length - 1].totalBookingsAllDays}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              {usageStats.length > 0 ? (
                <div className="flex h-[450px] w-full items-center justify-center rounded-xl border border-gray-300 bg-white shadow-lg md:flex-[4]">
                  <LineChart
                    xAxis={[
                      {
                        data: dateData,
                        scaleType: 'band',
                      },
                    ]}
                    yAxis={[
                      {
                        scaleType: 'linear',
                        min: 0,
                        tickMinStep: 1,
                      },
                    ]}
                    series={[
                      {
                        data: totalIncomeData,
                      },
                    ]}
                  />
                </div>
              ) : (
                <p>There is no usage information.</p>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default PropertyOwner
