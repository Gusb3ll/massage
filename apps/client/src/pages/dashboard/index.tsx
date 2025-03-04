import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

import AppLayout from '@/components/Layouts/App'

function Dashboard() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && session.user) {
      if (session.user.role === 'USER') {
        router.push('/dashboard/user')
      } else if (session.user.role === 'MASSAGER') {
        router.push('/dashboard/massager')
      } else if (session.user.role === 'PROPERTY_OWNER') {
        router.push('/dashboard/property-owner')
      }
    }
  }, [session, router])

  return <AppLayout>Loading...</AppLayout>
}

export default Dashboard
