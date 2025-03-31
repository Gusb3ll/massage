import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from '@/utils'

import { GetMassagerArgs, Massager, Stats } from './types'

export const getMassager = async (id: string) => {
  const res = await fetchers.Get<Massager>(`${ENDPOINT}/massager/public/${id}`)
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Massager
}

export const getMassagers = async (args: GetMassagerArgs) => {
  const { search } = args
  const res = await fetchers.Get<Massager[]>(
    `${ENDPOINT}/massager/public/list${search ? `?search=${search}` : ''}`,
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as Massager[]
}

export const getStats = async () => {
  const session = await getSession()

  const res = await fetchers.Get<Stats[]>(
    `${ENDPOINT}/massager/internal/dashboard/stats`,
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

  const res = await fetchers.Upload(`${ENDPOINT}/massager/internal/avatar`, {
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
    `${ENDPOINT}/massager/internal/file`,
    { data: formData, token: session?.user.accessToken },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as { url: string }
}

export * from './types'
