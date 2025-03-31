import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from '@/utils'

import { CreatePropertyArgs, GetPropertyArgs, Property, Stats } from './types'

export const getProperty = async (id: string) => {
  const res = await fetchers.Get<Property>(`${ENDPOINT}/property/public/${id}`)
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Property
}

export const getProperties = async (args: GetPropertyArgs) => {
  const res = await fetchers.Get<Property[]>(
    `${ENDPOINT}/property/public/list${args.search ? `?search=${args.search}` : ''}`,
  )
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

export const getPropertyStats = async () => {
  const session = await getSession()

  const res = await fetchers.Get<Stats[]>(
    `${ENDPOINT}/property/internal/dashboard/stats`,
    {
      token: session?.user.accessToken,
    },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Stats[]
}

export const uploadAvatar = async (file: File) => {
  const session = await getSession()

  const formData = new FormData()
  formData.append('file', file)

  const res = await fetchers.Upload(`${ENDPOINT}/property/internal/avatar`, {
    data: formData,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const uploadFile = async (file: File) => {
  const session = await getSession()

  const formData = new FormData()
  formData.append('file', file)

  const res = await fetchers.Upload<{ url: string }>(
    `${ENDPOINT}/property/internal/file`,
    { data: formData, token: session?.user.accessToken },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as { url: string }
}

export * from './types'
