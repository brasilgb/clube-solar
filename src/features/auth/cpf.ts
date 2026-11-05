export function cpfDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, 11);
}

export function formatCpf(value: string): string {
  const digits = cpfDigits(value);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function isValidCpf(value: string): boolean {
  const digits = cpfDigits(value);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  for (const length of [9, 10]) {
    const sum = [...digits.slice(0, length)].reduce(
      (total, digit, index) => total + Number(digit) * (length + 1 - index),
      0,
    );
    const check = (sum * 10) % 11;
    if (Number(digits[length]) !== (check === 10 ? 0 : check)) return false;
  }
  return true;
}

export function maskCpf(value: string): string {
  const digits = cpfDigits(value);
  return digits.length === 11 ? `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**` : '***.***.***-**';
}
