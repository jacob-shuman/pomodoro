import { PomodoroDuration, PomodoroPeriod } from "../models/pomodoro";

export const isValidPeriod = (period: PomodoroPeriod): boolean =>
  period.duration.hours > 0 ||
  period.duration.minutes > 0 ||
  period.duration.seconds > 0;

export const isPeriodComplete = (period: PomodoroPeriod) =>
  period.remainingTime &&
  period.remainingTime.hours === 0 &&
  period.remainingTime.minutes === 0 &&
  period.remainingTime.seconds === 0;

export const decrementDuration = (
  duration: PomodoroDuration
): PomodoroDuration => {
  if (duration.seconds > 1) {
    return { ...duration, seconds: duration.seconds - 1 };
  }

  if (duration.minutes > 1) {
    return { ...duration, minutes: duration.minutes - 1, seconds: 59 };
  }

  if (duration.hours > 1) {
    return {
      hours: duration.hours - 1,
      minutes: 59,
      seconds: 59,
    };
  }

  return {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
};
