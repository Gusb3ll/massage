import { getSession } from "next-auth/react";
import { ENDPOINT, HttpStatus, fetchers } from "@/utils";
import { Massager } from "./types";

export const getMassager = async (id: string) => {
    const res = await fetchers.Get<Massager>(`${ENDPOINT}/massager/public/${id}`)
    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data as Massager
}

export const getMassagers = async () => {
    const res = await fetchers.Get<Massager[]>(`${ENDPOINT}/massager/public/list`)
    if (res.statusCode >= HttpStatus.BAD_REQUEST) {
        throw new Error(res.message)
    }

    return res.data as Massager[]
}

export * from './types'
