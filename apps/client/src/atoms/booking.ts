import { atomWithStorage } from 'jotai/utils'

export const isBookingActiveAtom = atomWithStorage('isBookingActive', false)
export const massagerIdAtom = atomWithStorage<string | null>('massagerId', null)
export const propertyIdAtom = atomWithStorage<string | null>('propertyId', null)
