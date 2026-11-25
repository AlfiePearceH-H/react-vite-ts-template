import type { Ap_roomsesap_branch } from "../../../generated/models/Ap_roomsesModel"

export interface User{
    upn: string
    name: string
}

export interface Room{
    upn: string
    name: string
    branch: Ap_roomsesap_branch
}