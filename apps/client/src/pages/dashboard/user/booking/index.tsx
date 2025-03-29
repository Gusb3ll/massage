import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import UserBookingScene from '@/scenes/Dashboard/User/Booking'

const UserBooking = () => {
  return (
    <AppLayout>
      <DashboardLayout>
        <UserBookingScene />
      </DashboardLayout>
    </AppLayout>
  )
}

export default UserBooking
