import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from '@/utils'

import { CreateReviewArgs, Review } from './types'

export const getMassagerReviews = async (massagerId: string) => {
  const res = await fetchers.Get<Review[]>(
    `${ENDPOINT}/review/public/massager?id=${massagerId}`,
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Review[]
}

export const getPropertyReviews = async (propertyId: string) => {
  const res = await fetchers.Get<Review[]>(
    `${ENDPOINT}/review/public/property?id=${propertyId}`,
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Review[]
}

export const createMassagerReview = async (args: CreateReviewArgs) => {
  const session = await getSession()

  const res = await fetchers.Post(`${ENDPOINT}/review/internal/massager`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const createPropertyReview = async (args: CreateReviewArgs) => {
  const session = await getSession()

  const res = await fetchers.Post(`${ENDPOINT}/review/internal/property`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export * from './types'
