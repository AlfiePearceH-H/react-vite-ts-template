import "./TimeSlotPicker.css";
import { useMemo, useState } from "react";
import { addMinutes, formatTime } from "../../../../libs/utils/date";

interface Props {
    open: boolean;
    onClose: () => void;

    slots: string[];
    selected?: string;
    duration: number;
    onSelect: (slot: string) => void;
}

export default function TimeSlotPicker({
    open,
    onClose,
    slots,
    selected,
    duration,
    onSelect
}: Props) {
    const grouped = useMemo(() => {
        return slots.reduce((acc, slot) => {
            const date = slot.substring(0, 10);
            (acc[date] ??= []).push(slot);
            return acc;
        }, {} as Record<string, string[]>);
    }, [slots]);
    const days = Object.keys(grouped);
    const [selectedDay, setSelectedDay] = useState(days[0]);

    if (!open) return null;

    return (
        <div className="slot-modal-overlay" onClick={onClose}>
            <div className="slot-modal" onClick={e => e.stopPropagation()}>
                <div className="availability-card">
                    <div className="availability-header">
                        Available Time Slots
                    </div>
                    <div className="day-tabs">
                        {days.map(day => (
                            <button key={day} className={selectedDay === day ? "day-tab active" : "day-tab"} onClick={() => setSelectedDay(day)}>
                                {new Date(day).toLocaleDateString("en-GB", {day: "numeric", month: "short"})}
                            </button>
                        ))}
                    </div>
                    <div className="slots-grid">
                        {grouped[selectedDay]?.map(slot => (
                            <button key={slot} className={selected === slot ? "slot-card active" : "slot-card"} onClick={() => onSelect(slot)}>
                                <span>
                                    {formatTime(slot)}
                                </span>
                                <span>
                                    {formatTime(addMinutes(new Date(slot), duration))}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}