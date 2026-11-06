/** Formats integer cents as Brazilian currency, e.g. 7668 -> "R$ 76,68". */
export function formatBRL(cents: number): string {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  const reais = Math.floor(abs / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const centavos = String(abs % 100).padStart(2, '0');
  return `${sign}R$ ${reais},${centavos}`;
}

/** "2026-11-10" -> "10/11" */
export function formatDayMonth(isoDate: string): string {
  const [, month, day] = isoDate.split('-');
  return `${day}/${month}`;
}

/** "2026-11-10" -> "10/11/2026" */
export function formatFullDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

/** True when the calendar day `isoDate` has already ended on the device clock. */
export function hasPassed(isoDate: string): boolean {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day, 23, 59, 59).getTime() < Date.now();
}

export function greetingFor(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}
