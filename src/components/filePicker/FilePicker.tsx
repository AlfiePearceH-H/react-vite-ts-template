import { useRef } from "react";
import "./FilePicker.css";
import type { FilePickerProps, SelectedFile } from "./types";

export default function FilePicker({multiple = false, accept = "*", onFilesSelected}: FilePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files || []);

        const selectedFiles: SelectedFile[] = files.map(file => ({
            file,
            name: file.name,
            size: file.size,
            type: file.type,
        }));

        onFilesSelected?.(selectedFiles);
    };

    return (
        <>
            <button
                type="button"
                className="file-picker-button"
                onClick={() => inputRef.current?.click()}
            >
                Upload File
            </button>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={e => {
                    handleFileChange(e);
                    e.target.value = "";
                }}
                style={{ display: "none" }}
            />
        </>
    );
}