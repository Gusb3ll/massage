import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import MassagerProfileScene from '@/scenes/Dashboard/User/Massager'

const MassagerProfile = () => {
  return (
    <AppLayout>
      <DashboardLayout>
        <MassagerProfileScene />
      </DashboardLayout>
    </AppLayout>
  )
}

export default MassagerProfile
