export function formatCurrency(value: number, currency = "GBP", locale = "en-GB"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}
