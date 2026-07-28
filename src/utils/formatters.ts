export const formatPrice = (price: number): string => {
  return '₺' + price.toFixed(2).replace('.', ',');
};

export const formatDate = (date: Date | string, locale: string = 'tr-TR'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};

export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatDistance = (km: number): string => {
  return `${km.toFixed(1)} km`;
};

export const formatDeliveryTime = (min: number): string => {
  return `${min}-${min + 10} dk`;
};

export const getRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diff < 60) {
    return 'Az önce';
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} dk önce`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} saat önce`;
  } else {
    return `${Math.floor(diff / 86400)} gün önce`;
  }
};

export const formatCardNumber = (num: string): string => {
  const digits = num.replace(/\D/g, '').padStart(16, '0');
  const lastFour = digits.slice(-4);
  const masked = '************' + lastFour;
  return masked.match(/.{1,4}/g)!.join(' ');
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return (
    digits.length >= 10 &&
    digits.length <= 11 &&
    (digits.startsWith('05') || digits.startsWith('5'))
  );
};
