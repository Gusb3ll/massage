import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from '@/utils'

import { Booking, CreateBookingArgs } from './types'

export const getBookings = async () => {
  const session = await getSession()
  const res = await fetchers.Get<Booking[]>(
    `${ENDPOINT}/booking/internal/list`,
    { token: session?.user.accessToken },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Booking[]
}

export const getBooking = async (id: string) => {
  const session = await getSession()
  const res = await fetchers.Get<Booking>(
    `${ENDPOINT}/booking/internal/${id}`,
    { token: session?.user.accessToken },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Booking
}

export const createBooking = async (args: CreateBookingArgs) => {
  const session = await getSession()
  const res = await fetchers.Post(`${ENDPOINT}/booking/internal`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const cancelBooking = async (id: string) => {
  const session = await getSession()
  const res = await fetchers.Post(`${ENDPOINT}/booking/internal/cancel/${id}`, {
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export * from './types'
