import { useState, useEffect } from "react";

export function useLocalStorage(key:string, initialValue:string) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored !== null ? stored : initialValue;
        } catch {
            return initialValue;
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem(key, value);
        } catch {
            // localStorage unavailable - private mode, quota exceeded, etc
        }
    }, [key, value]);
    return [value, setValue];
}