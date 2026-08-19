import { formatPrice, formatDeliveryTime, validatePhone, getRelativeTime } from '../src/utils/formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('formats a positive number correctly', () => {
      expect(formatPrice(10)).toBe('₺10,00');
      expect(formatPrice(10.5)).toBe('₺10,50');
    });

    it('formats zero correctly', () => {
      expect(formatPrice(0)).toBe('₺0,00');
    });
  });

  describe('formatDeliveryTime', () => {
    it('formats the time range correctly', () => {
      expect(formatDeliveryTime(30)).toBe('30-40 dk');
      expect(formatDeliveryTime(0)).toBe('0-10 dk');
      expect(formatDeliveryTime(45)).toBe('45-55 dk');
    });
  });

  describe('validatePhone', () => {
    it('validates correct turkish phone numbers', () => {
      expect(validatePhone('05551234567')).toBe(true);
      expect(validatePhone('5551234567')).toBe(true);
      expect(validatePhone('+905551234567')).toBe(true);
    });
    
    it('rejects invalid phone numbers', () => {
      expect(validatePhone('1234')).toBe(false);
      expect(validatePhone('03121234567')).toBe(false); // starts with 03
    });
  });

  describe('getRelativeTime', () => {
    it('returns Yakında for future dates', () => {
      const future = new Date(Date.now() + 100000);
      expect(getRelativeTime(future)).toBe('Yakında');
    });
    
    it('returns Az önce for very recent dates', () => {
      const past = new Date(Date.now() - 10000); // 10 seconds ago
      expect(getRelativeTime(past)).toBe('Az önce');
    });
  });
});
