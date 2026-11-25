export function formatDate(date: Date | string, locale = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string, locale = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatTime(date: Date | string, locale = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export const getFinancialYear = (dateString: string): number => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return date.getMonth() >= 4
      ? year
      : year - 1
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes*60000);
}
export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}