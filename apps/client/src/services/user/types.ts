export type RegisterArgs = {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: 'MALE' | 'FEMALE'
  dateOfBirth: string
  role: 'USER' | 'MASSAGER' | 'PROPERTY_OWNER'
}

export type LoginArgs = {
  email: string
  password: string
}

export type VerifyEmailArgs = {
  token: string
}

export type User = {
  id: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  role: 'USER' | 'MASSAGER' | 'PROPERTY_OWNER' | 'ADMIN'
  isEmailVerified: boolean
}

export type UpdateUserArgs = {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  gender?: string
  email?: string
}

export type UpdatePasswordArgs = {
  oldPassword: string
  newPassword: string
}
