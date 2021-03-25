import { TimerDuration } from "../hooks/useTimer";

export const isDurationComplete = (duration: TimerDuration) =>
  duration &&
  duration.hours === 0 &&
  duration.minutes === 0 &&
  duration.seconds === 0;

export const decrementDuration = (duration: TimerDuration): TimerDuration => {
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

export const getHumanReadableDuration = (duration: TimerDuration) => {
  if (!duration) {
    return "";
  }

  const { hours, minutes, seconds } = duration;

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  if (minutes > 0) {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
};
