import React from 'react'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'

const user = () => {
  return (
    <AppLayout>
      <DashboardLayout>
        <div>thishomepage</div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default user
