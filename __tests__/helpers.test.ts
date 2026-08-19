import { generateId, getInitials, getGreetingKey, clamp } from '../src/utils/helpers';

describe('helpers', () => {
  describe('generateId', () => {
    it('generates string of correct length', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBe(8);
    });

    it('generates unique ids', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('getInitials', () => {
    it('returns initials for first and last name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('returns first letter for single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('handles extra spaces', () => {
      expect(getInitials('  John   Doe  ')).toBe('JD');
    });
  });

  describe('getGreetingKey', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('returns morning greeting between 5 and 11', () => {
      jest.setSystemTime(new Date(2023, 1, 1, 8, 0, 0));
      expect(getGreetingKey()).toBe('greetings.morning');
    });

    it('returns afternoon greeting between 12 and 17', () => {
      jest.setSystemTime(new Date(2023, 1, 1, 14, 0, 0));
      expect(getGreetingKey()).toBe('greetings.afternoon');
    });

    it('returns evening greeting at other times', () => {
      jest.setSystemTime(new Date(2023, 1, 1, 20, 0, 0));
      expect(getGreetingKey()).toBe('greetings.evening');
    });
  });

  describe('clamp', () => {
    it('returns min if value is less than min', () => {
      expect(clamp(5, 10, 20)).toBe(10);
    });

    it('returns max if value is greater than max', () => {
      expect(clamp(25, 10, 20)).toBe(20);
    });

    it('returns value if within range', () => {
      expect(clamp(15, 10, 20)).toBe(15);
    });
  });
});
