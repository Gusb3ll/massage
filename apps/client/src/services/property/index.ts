import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from '@/utils'

import { CreatePropertyArgs, Property } from './types'

export const getProperty = async (id: string) => {
  const res = await fetchers.Get<Property>(`${ENDPOINT}/property/public/${id}`)
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Property
}

export const getProperties = async () => {
  const res = await fetchers.Get<Property[]>(`${ENDPOINT}/property/public/list`)
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Property[]
}

export const createProperty = async (args: CreatePropertyArgs) => {
  const session = await getSession()
  const res = await fetchers.Post(`${ENDPOINT}/property/internal`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const updateProperty = async (id: string, args: CreatePropertyArgs) => {
  const session = await getSession()
  const res = await fetchers.Patch(`${ENDPOINT}/property/internal/${id}`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const deleteProperty = async (id: string) => {
  const session = await getSession()
  const res = await fetchers.Delete(`${ENDPOINT}/property/internal/${id}`, {
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export * from './types'
