export type Property = {
  id: string
  name: string
  address: string
  description: string
  images: string[]
  price: number
  rooms: number
  roomWidth: number
  roomHeight: number
  owner: {
    id: string
    email: string
    firstName: string
    lastName: string
    profileImage: string
  }
}

export type CreatePropertyArgs = {
  name: string
  description: string
  address: string
  images: string[]
  price: number
  rooms: number
  roomWidth: number
  roomHeight: number
}

export type UpdatePropertyArgs = {
  name?: string
  description?: string
  address?: string
  images?: string[]
  price?: number
  rooms?: number
  roomWidth?: number
  roomHeight?: number
}

export type GetPropertyArgs = {
  search?: string
}

export type Stats = {
  totalIncome: number
  totalBookings: number
  date: string
  totalIncomeAllDays: number
  totalBookingsAllDays: number
}
