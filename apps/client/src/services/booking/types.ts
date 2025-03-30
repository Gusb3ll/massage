export type Booking = {
  id: string
  userId: string
  massagerId: string
  propertyId: string
  status:
  | 'PENDING_MASSAGER'
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'CANCELED'
  | 'COMPLETED'
  bookingDate: string
  massager: {
    id: string
    firstName: string
    lastName: string
    profileImage: string
    gender: 'MALE' | 'FEMALE'
    dateOfBirth: string
  }
  property: {
    id: string
    name: string
    images: string[]
    price: number
    address: string
    rooms: number
    roomWidth: number
    roomHeight: number
    owner: {
      id: string
      firstName: string
      lastName: string
      profileImage: string
    }
  }
  user: {
    id: string
    firstName: string
    lastName: string
    profileImage: string
  }
}

export type BookingChat = {
  id: string
  bookingId: string
  message: string
  actor: string
}

export type CreateBookingArgs = {
  massagerId: string
  propertyId: string
  bookingDate: string
}

export type GetBookingsArgs = {
  search?: string
}