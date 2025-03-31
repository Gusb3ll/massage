import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from '@/utils'

import {
  Booking,
  BookingChat,
  CreateBookingArgs,
  CreateBookingChatArgs,
  GetBookingsArgs,
} from './types'

export const getBookings = async (args: GetBookingsArgs) => {
  const session = await getSession()
  const { search } = args
  const res = await fetchers.Get<Booking[]>(
    `${ENDPOINT}/booking/internal/list${search ? `?search=${search}` : ''}`,
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

export const getMassagerBooking = async (args: GetBookingsArgs) => {
  const session = await getSession()
  const { search } = args
  const res = await fetchers.Get<Booking[]>(
    `${ENDPOINT}/booking/internal/massager/list${search ? `?search=${search}` : ''}`,
    { token: session?.user.accessToken },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Booking[]
}

export const confirmBooking = async (id: string) => {
  const session = await getSession()
  const res = await fetchers.Post(
    `${ENDPOINT}/booking/internal/confirm/${id}`,
    {
      token: session?.user.accessToken,
    },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const getBookingChat = async (id: string) => {
  const session = await getSession()

  const res = await fetchers.Get<BookingChat[]>(
    `${ENDPOINT}/booking/internal/chat/${id}`,
    { token: session?.user.accessToken },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as BookingChat[]
}

export const createBookingChat = async (
  id: string,
  args: CreateBookingChatArgs,
) => {
  const session = await getSession()

  const res = await fetchers.Post(`${ENDPOINT}/booking/internal/chat/${id}`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export * from './types'
