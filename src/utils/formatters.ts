export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `BRD-${randomNum}`;
}
