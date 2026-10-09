export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;

    const units = ["KB", "MB", "GB"];
    let size = bytes / 1024;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
};

export const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
});

export const fileToPowerAutomateFile = (file: File): Promise<{contentBytes: string; name: string;}> => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
        const result = reader.result as string;

        resolve({
        contentBytes: result.split(",")[1],
        name: file.name,
        });
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
});