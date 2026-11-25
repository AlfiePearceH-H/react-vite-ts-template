import "./BookingForm.css";
import { Ap_roomsesap_branch } from "../../../generated/models/Ap_roomsesModel";
import type { Room, User } from "../libs/models";

interface Props {
    client: string;
    user?: User;
    room?: Room;
    branch?: Ap_roomsesap_branch;

    users: User[];
    rooms: Room[];
    branches: Ap_roomsesap_branch[];

    fromDate: string;
    toDate: string;
    duration: number;

    setClient: (value: string) => void;
    setUser: (user?: User) => void;
    setRoom: (room?: Room) => void;
    setBranch: (branch?: Ap_roomsesap_branch) => void;
    setFromDate: (date: string) => void;
    setToDate: (date: string) => void;
    setDuration: (duration: number) => void;
}

export default function BookingForm(props: Props) {
    return (
        <div className="booking-form">
            <div className="search-options">
                <div className="field">
                    <label>From Date</label>
                    <input type="date" value={props.fromDate} onChange={e => props.setFromDate(e.target.value)} />
                </div>

                <div className="field">
                    <label>To Date</label>
                    <input type="date" value={props.toDate} onChange={e => props.setToDate(e.target.value)} />
                </div>

                <div className="field">
                    <label>Duration</label>
                    <select value={props.duration} onChange={e => props.setDuration(Number(e.target.value))}>
                        <option value={30}>Half an hour</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>Hour and a half</option>
                        <option value={120}>2 hours</option>
                    </select>
                </div>
            </div>

            <input className="booking-form__input" placeholder="Client email" value={props.client} onChange={e => props.setClient(e.target.value)}/>
            <select value={props.user?.upn ?? ""} onChange={e => props.setUser(props.users.find(u => u.upn === e.target.value))}>
                {props.users.map(u => (
                    <option key={u.upn} value={u.upn}>
                        {u.name}
                    </option>
                ))}
            </select>

            <select value={props.branch ?? ""} onChange={e => props.setBranch(Number(e.target.value) as Ap_roomsesap_branch)}>
                {props.branches.map(b => (
                    <option key={b} value={b}>
                        {Ap_roomsesap_branch[b]}
                    </option>
                ))}
            </select>

            <select value={props.room?.upn ?? ""} onChange={e => props.setRoom(props.rooms.find(r => r.upn === e.target.value))}>
                {props.rooms.filter(r => props.branch == null || r.branch === props.branch).map(r => (
                    <option key={r.upn} value={r.upn}>
                        {r.name}
                    </option>
                ))}
            </select>
        </div>
    );
}