// import { Ap_familyvettingusersService, Ap_roomsesService, CalendarKeeping_GetSlots_BookMeetingsService } from "../../../generated";
// import type { Ap_familyvettingusers } from "../../../generated/models/Ap_familyvettingusersModel";
// import { Ap_roomsesap_branch, type Ap_roomses } from "../../../generated/models/Ap_roomsesModel";
import type { Room, User } from "./models";

// SET THE ABOVE IMPORTS CORRECTLY

export async function GetBranches()/*: Promise<Ap_roomsesap_branch[]>*/ {
    // return Object.keys(Ap_roomsesap_branch).map(Number) as Ap_roomsesap_branch[]
}

export async function GetRooms()/*: Promise<Room[]>*/ {
    // const rooms = (await Ap_roomsesService.getAll()).data as Ap_roomses[]
    // return rooms.map(r => ({'name': r.ap_displayname, 'upn': r.ap_upn, 'branch': r.ap_branch}) as Room)
}

export async function GetUsers()/*: Promise<User[]>*/{
    // const users = (await Ap_familyvettingusersService.getAll()).data as Ap_familyvettingusers[]
    // return users.map(u => ({'name': u.ap_displayname, 'upn': u.ap_upn}) as User)
}

export async function GetTimes(Users: string[], Room: string, StartDate: Date, EndDate: Date, duration: number)/*: Promise<string | string[]> */{
    // const results = (await CalendarKeeping_GetSlots_BookMeetingsService.Run({text: "Get Times", text_1: StartDate.toISOString(), text_2: EndDate.toISOString(), text_3: [...Users, Room].join(";"), number: duration})).data.times
    // return JSON.parse(results ?? "[]")
}

export async function CreateMeeting(Users: string[], Room: string | null, StartDateTime: Date, EndDateTime: Date) {
    // CalendarKeeping_GetSlots_BookMeetingsService.Run({text: "Book Meeting", text_1: StartDateTime.toISOString(), text_2: EndDateTime.toISOString(), text_3: [...Users, Room].join(";")})
}