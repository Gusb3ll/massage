export type Booking = {
  id: string
  userId: string
  massagerId: string
  propertyId: string
  status: string
  bookingDate: string
  owner: {
    id: string
    email: string
    firstName: string
    lastName: string
    profileImage: string
    gender: string
  } | null
  massager: {
    coverImage: string
    massageImages: string[]
    certificates: string[]
    vaccineCertificates: string[]
    status: 'AVAILABLE' | 'OCCUPIED' | 'UNAVAILABLE'
    languages: string[]
    skills: string[]
    profileImage: string
    firstName: string
    lastName: string
    gender: string
    dateOfBirth: string
  } | null
  property: {
    id: string
    name: string
    address: string
    images: string[]
    price: number
    rooms: number
    roomWidth: number
    roomHeight: number
  } | null
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
