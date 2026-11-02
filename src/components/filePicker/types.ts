export interface SelectedFile {
    file: File;
    name: string;
    size: number;
    type: string;
}

export interface FilePickerProps {
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
    buttonLabel?: string;
    onFilesSelected?: (files: SelectedFile[]) => void;
}