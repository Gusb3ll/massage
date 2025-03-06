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
  profileImage: string
  isEmailVerified: boolean
  massager: {
    coverImage: string
    massageImages: string[]
    certificates: string[]
    vaccineCertificates: string[]
    status: 'AVAILABLE' | 'OCCUPIED' | 'UNAVAILABLE'
    languages: string[]
    skills: string[]
  } | null
  owner: {
    id: string
    coverImage: string
  } | null
}

export type UpdateUserArgs = {
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  profileImage?: string
}

export type UpdatePasswordArgs = {
  oldPassword: string
  newPassword: string
}
