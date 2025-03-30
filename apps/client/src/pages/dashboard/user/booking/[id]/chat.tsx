import { useRouter } from 'next/router'

const BookingChat = () => {
  const router = useRouter()

  const bookingId = router.query.id as string | undefined

  return <>chat {bookingId}</>
}

export default BookingChat
