export type Massager = {
  id: string
  coverImage: string
  massageImages: string[]
  certificates: string[]
  vaccineCertificates: string[]
  languages: string[]
  skills: string[]
  profileImage: string
  firstName: string
  lastName: string
  gender: string
  address: string
  dateOfBirth: string
}

export type GetMassagerArgs = {
  search?: string
}

export type Stats = {
  totalIncome: number
  count: number
  date: string
}
