import { TimerDuration } from "@hooks/useTimer/useTimer";
import { Theme } from "./theme";

export enum PomodoroError {
  MISSING_PERIODS = "MISSING_PERIODS",
  INVALID_PERIOD = "INVALID_PERIOD",
}

export interface PomodoroDurationOld {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface PomodoroPeriodOld {
  // Name of period
  title: string;

  // How long the period will last
  duration: PomodoroDurationOld;

  // How much time is remaining
  remainingTime?: PomodoroDurationOld;

  // Called when the period begins
  // Args: indexes of current, next, previous periods
  // Return: Data to pass to next period
  onBegin?: (period: number, nextPeriod: number, prevPeriod: number) => void;

  // Called once an hour passes
  onHour?: (remainingTime: PomodoroDurationOld) => void;

  // Called once an hour passes
  onMinute?: (remainingTime: PomodoroDurationOld) => void;

  // Called once an hour passes
  onSecond?: (remainingTime: PomodoroDurationOld) => void;

  // Called when the period ends
  // Args: indexes of current, next, previous periods
  onEnd?: (period: number, nextPeriod: number, prevPeriod: number) => void;
}

export interface PomodoroPeriod {
  // Name of period
  title: string;

  // How long the period will last
  duration: TimerDuration;

  remaining?: TimerDuration;

  // Optional theme to use when period is active
  theme?: Theme;
}
