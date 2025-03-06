export type Property = {
  id: string
  name: string
  // address: {}
  description: string
  image: string[]
  price: number
  rooms: number
  roomWidth: number
  roomHeight: number
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
