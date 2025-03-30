import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from '@/utils'

export const createPayment = async (bookingId: string) => {
  const session = await getSession()
  const res = await fetchers.Post<{ paymentLink: string }>(
    `${ENDPOINT}/payment/internal`,
    {
      token: session?.user.accessToken,
      data: { bookingId },
    },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as { paymentLink: string }
}
