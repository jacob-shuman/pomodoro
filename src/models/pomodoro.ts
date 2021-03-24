export enum PomodoroError {
  MISSING_PERIODS = "MISSING_PERIODS",
  INVALID_PERIOD = "INVALID_PERIOD",
}

export interface PomodoroDuration {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface PomodoroPeriod {
  // Name of period
  title: string;

  // How long the period will last
  duration: PomodoroDuration;

  // How much time is remaining
  remainingTime?: PomodoroDuration;

  // Called when the period begins
  // Args: indexes of current, next, previous periods
  // Return: Data to pass to next period
  onBegin?: (period: number, nextPeriod: number, prevPeriod: number) => void;

  // Called once an hour passes
  onHour?: (remainingTime: PomodoroDuration) => void;

  // Called once an hour passes
  onMinute?: (remainingTime: PomodoroDuration) => void;

  // Called once an hour passes
  onSecond?: (remainingTime: PomodoroDuration) => void;

  // Called when the period ends
  // Args: indexes of current, next, previous periods
  onEnd?: (period: number, nextPeriod: number, prevPeriod: number) => void;
}
