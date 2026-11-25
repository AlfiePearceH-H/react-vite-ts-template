import "./BookingDialog.css";
import BookingDialogContent from "./BookingDialogContent";

interface Props {
    open: boolean;
    onClose: () => void;
    email?: string;
}

export default function BookingDialog({open, onClose, email}: Props) {
    if (!open) return null;
    return (
        <div className="booking-dialog__backdrop" onClick={onClose}>
            <div className="booking-dialog" onClick={e => e.stopPropagation()}>
                <div className="booking-dialog__header">
                    <h2>
                        Book Family Vetting Meeting
                    </h2>
                    <button className="booking-dialog__close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <BookingDialogContent email={email}/>
            </div>
        </div>
    );
}