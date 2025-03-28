import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

import AppLayout from '@/components/Layouts/App'

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && session.user) {
      if (session.user.role === 'USER') {
        router.push('/dashboard/user/booking')
      } else if (session.user.role === 'MASSAGER') {
        router.push('/dashboard/massager')
      } else if (session.user.role === 'PROPERTY_OWNER') {
        router.push('/dashboard/property')
      }
    }
  }, [session, router])

  return (
    <AppLayout>
      <div className="p-8">Loading...</div>
    </AppLayout>
  )
}

export default Dashboard
