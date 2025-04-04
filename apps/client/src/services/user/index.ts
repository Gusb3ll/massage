import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from '@/utils'

import {
  LoginArgs,
  RegisterArgs,
  UpdatateMassagerArgs,
  UpdatePasswordArgs,
  UpdateUserArgs,
  User,
} from './types'

export const register = async (args: RegisterArgs) => {
  const res = await fetchers.Post<{ accessToken: string }>(
    `${ENDPOINT}/user/public/register`,
    { data: args },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as { accessToken: string }
}

export const login = async (
  args: LoginArgs,
  headers: { [key: string]: string },
) => {
  const res = await fetchers.Post<{ accessToken: string }>(
    `${ENDPOINT}/user/public/login`,
    { data: args, headers },
  )
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as { accessToken: string }
}

export const verifyEmail = async (token: string) => {
  const res = await fetchers.Post(`${ENDPOINT}/user/public/verify`, {
    data: { token },
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const getMe = async (
  accessToken: string,
  headers: { [key: string]: string },
) => {
  const res = await fetchers.Get<User>(`${ENDPOINT}/user/internal/me`, {
    token: accessToken,
    headers,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }

  return res.data as User
}

export const updateUser = async (args: UpdateUserArgs) => {
  const session = await getSession()

  const res = await fetchers.Patch(`${ENDPOINT}/user/internal`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const updatePassword = async (args: UpdatePasswordArgs) => {
  const session = await getSession()

  const res = await fetchers.Patch(`${ENDPOINT}/user/internal/password`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const updateMassager = async (args: UpdatateMassagerArgs) => {
  const session = await getSession()

  const res = await fetchers.Patch(`${ENDPOINT}/massager/internal`, {
    data: args,
    token: session?.user.accessToken,
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export const verifyToken = async (token: string) => {
  const res = await fetchers.Post(`${ENDPOINT}/user/public/verify`, {
    data: { token },
  })
  if (res.statusCode >= HttpStatus.BAD_REQUEST) {
    throw new Error(res.message)
  }
}

export * from './types'
