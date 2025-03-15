import { getSession } from 'next-auth/react'

import { ENDPOINT, HttpStatus, fetchers } from "@/utils";

import { Booking } from "./types";


export const getBookings = async () => {
    const session = await getSession();
    const res = await fetchers.Get<Booking[]>(`${ENDPOINT}/booking/internal/list`, {
        token: session?.user.accessToken,
    });
    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message);
    }

    return res.data as Booking[];
};

export const getBooking = async (id: string) => {
    const session = await getSession();
    const res = await fetchers.Get<Booking>(`${ENDPOINT}/booking/internal/${id}`, {
        token: session?.user.accessToken,
    });
    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message);
    }

    return res.data as Booking;
};

export * from './types'
