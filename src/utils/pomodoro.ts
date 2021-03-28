import { PomodoroPeriod } from "@models/pomodoro";

export const isValidPeriod = (period: PomodoroPeriod): boolean =>
  period.duration.hours > 0 ||
  period.duration.minutes > 0 ||
  period.duration.seconds > 0;
