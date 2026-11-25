import { useEffect, useState } from "react";
import type { Room, User } from "./libs/models";
import { Ap_roomsesap_branch } from "../../generated/models/Ap_roomsesModel";
import { CreateMeeting, GetBranches, GetRooms, GetTimes, GetUsers } from "./libs/data";
import { BookingForm, Loading, TimeSlotPicker } from "../../components";
import { addDays, addMinutes, formatTime } from "../../libs/utils/date";

export default function BookingDialogContent({email}: {email?: string}) {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User>()
    const [branches, setBranches] = useState<Ap_roomsesap_branch[]>([])
    const [selectedBranch, setSelectedBranch] = useState<Ap_roomsesap_branch>()
    const [rooms, setRooms] = useState<Room[]>([])
    const [selectedRoom, setSelectedRoom] = useState<Room>()
    useEffect(() => {
        GetUsers().then(U => {setUsers(U); setSelectedUser(U[0])})
        GetBranches().then(B => {setBranches(B); setSelectedBranch(B[0])})
        GetRooms().then(R => {setRooms(R); setSelectedRoom(R[0])})
    }, [])
    const [client, setClient] = useState<string>(email ?? "")
    const [slots, setSlots] = useState<string[]>([])
    const [selectedSlot, setSelectedSlot] = useState<string>();
    const [showSlots, setShowSlots] = useState(false);
    const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
    const [toDate, setToDate] = useState(addDays(new Date(), 7).toISOString().split("T")[0]);
    const [duration, setDuration] = useState(60);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const loadSlots = async (): Promise<undefined> => {
        try {
            setLoadingSlots(true)
            setSlots([])
            const times = await GetTimes([selectedUser?.upn ?? ""], selectedRoom?.upn ?? "", new Date(fromDate), addDays(new Date(toDate), 1), duration)
            setSlots([...times]);
            setShowSlots(true);
        } finally {
            setLoadingSlots(false)
        }
    }
    const bookMeeting = (): undefined => {
        CreateMeeting([client ?? "", selectedUser?.upn ?? ""], selectedRoom?.upn ?? "", new Date(selectedSlot!), addMinutes(new Date(selectedSlot!), duration))
    }
    return (
        <div className="main-page">
            <BookingForm
                client={client}
                user={selectedUser}
                room={selectedRoom}
                branch={selectedBranch}
                users={users}
                rooms={rooms}
                branches={branches}
                fromDate={fromDate}
                toDate={toDate}
                duration={duration}
                setClient={setClient}
                setUser={setSelectedUser}
                setRoom={setSelectedRoom}
                setBranch={setSelectedBranch}
                setFromDate={setFromDate}
                setToDate={setToDate}
                setDuration={setDuration}
            />

            <div className="action-bar">
                <button className="btn btn--primary" onClick={loadSlots} disabled={loadingSlots}>
                    {loadingSlots ? "Finding Availability..." : "Find Available Slots"}
                </button>
            </div>

            {!!slots.length && (
            <TimeSlotPicker
                open={showSlots}
                onClose={() => setShowSlots(false)}
                slots={slots}
                selected={selectedSlot}
                duration={duration}
                onSelect={slot => {setSelectedSlot(slot); setShowSlots(false);}}
            />
            )}

            {loadingSlots ? (
                <Loading />
            ) : (
            selectedSlot && (
            <div className="booking-summary">
                <h3>Ready to Book</h3>
                <span>FE: {selectedUser?.name}</span>
                <span> @: {Ap_roomsesap_branch[selectedBranch!]} - {selectedRoom?.name}</span>
                <span> on: {new Date(selectedSlot).toLocaleString("en-GB", {year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"})} {"->"} {formatTime(addMinutes(new Date(selectedSlot), duration))}</span>
            </div>
            ))}

            {client && selectedSlot && (
            <div className="action-bar">
                <button className="btn btn--primary" disabled={!selectedSlot || !client} onClick={bookMeeting}>
                    Book
                </button>
            </div>
            )}
        </div>
    );
}