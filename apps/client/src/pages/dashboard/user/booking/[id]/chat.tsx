// import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'

const BookingChat = () => {
  // const router = useRouter()

  // const bookingId = router.query.id as string | undefined

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="chat chat-start">
          <div className="chat-bubble">
            Its over Anakin,
            <br />I have the high ground.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default BookingChat
