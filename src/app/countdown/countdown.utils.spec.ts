import { getTimeRemaining } from './countdown.utils';

describe('getTimeRemaining', () => {
  it('should return the correct time remaining when the target date is in the future', () => {
    const now = new Date().getTime();
    const targetDate = new Date(now + (1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 5 + 1000 * 60 * 30 + 1000 * 45)); // 2 days, 5 hours, 30 minutes, 45 seconds from now

    const result = getTimeRemaining(targetDate);

    expect(result).toBe('002 days, 05 h, 30 m, 45 s');
  });

  it('should return "The event has passed!" when the target date is in the past', () => {
    const now = new Date().getTime();
    const targetDate = new Date(now - 1000); // 1 second in the past

    const result = getTimeRemaining(targetDate);

    expect(result).toBe('The event has passed!');
  });

  it('should return an empty string when the target date is null', () => {
    const result = getTimeRemaining(null);

    expect(result).toBe('');
  });

  it('should return 000 days, 00 h, 00 m, 00 s when the target date is now', () => {
    const now = new Date().getTime();
    const targetDate = new Date(now); // Now

    const result = getTimeRemaining(targetDate);

    expect(result).toBe('000 days, 00 h, 00 m, 00 s');
  });
});
