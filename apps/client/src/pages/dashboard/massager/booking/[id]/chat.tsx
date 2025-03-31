import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import {
  createBookingChat,
  getBooking,
  getBookingChat,
} from '@/services/booking'

const BookingChat = () => {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const bookingId = router.query.id as string | undefined

  const { data: chats, refetch } = useQuery({
    queryKey: ['chat', bookingId],
    queryFn: () => getBookingChat(bookingId!),
    enabled: !!bookingId,
    refetchInterval: 2500,
  })
  const { data: booking } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId!),
    enabled: !!bookingId,
  })

  const createChatMutation = useMutation({
    mutationFn: (message: string) =>
      createBookingChat(bookingId!, { message, actor: 'MASSAGER' }),
    onSuccess: () => refetch(),
    onError: e => toast.error(e.message),
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  return (
    <AppLayout>
      <DashboardLayout>
        <div className="flex h-full max-h-[95vh] w-full flex-col justify-between gap-4">
          <div className="flex-grow overflow-auto">
            {chats?.map(c =>
              c.actor === 'MASSAGER' ? (
                <div key={c.id} className="chat chat-end">
                  <div className="chat-header">
                    {booking?.massager.firstName} {booking?.massager.lastName}
                    <time className="pl-1 text-xs opacity-50">
                      {dayjs(c.createdAt).format('DD/MM HH:mm')}
                    </time>
                  </div>
                  <div className="chat-bubble bg-green-300 text-black">
                    {c.message}
                  </div>
                </div>
              ) : (
                <div key={c.id} className="chat chat-start">
                  <div className="chat-header">
                    {booking?.user.firstName} {booking?.user.lastName}
                    <time className="pl-1 text-xs opacity-50">
                      {dayjs(c.createdAt).format('DD/MM HH:mm')}
                    </time>
                  </div>
                  <div className="chat-bubble">{c.message}</div>
                </div>
              ),
            )}
            <div ref={messagesEndRef} />
          </div>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault()
                const input = e.currentTarget.querySelector('input')
                if (input) {
                  let message = input.value
                  message = message.trim()

                  if (message.length > 255) {
                    return toast.error('Message is too long')
                  }

                  if (message) {
                    input.value = ''
                    createChatMutation.mutate(message)
                  }
                }
              }}
            >
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Press enter to send message"
              />
            </form>
          </div>
        </div>
      </DashboardLayout>
    </AppLayout>
  )
}

export default BookingChat
