import { useTimer } from "@hooks";
import { decrementDuration } from "@utils/timer";
import { useState } from "react";
import { PomodoroPeriod } from "@models/pomodoro";
import { isDurationComplete } from "@utils/timer";

export const usePomodoro = (
  options?: Partial<{
    onStart: () => void;
    onPause: () => void;
    onStop: () => void;
  }>
) => {
  const [isFinished, setIsFinished] = useState(false);
  const [looping, setLooping] = useState(true); //TODO: switch to false
  const [periods, setPeriods] = useState<PomodoroPeriod[]>([
    {
      title: "Focus",
      duration: { hours: 0, minutes: 25, seconds: 0 },
    },
    {
      title: "Short Break",
      duration: { hours: 0, minutes: 5, seconds: 0 },
    },
    {
      title: "Focus",
      duration: { hours: 0, minutes: 25, seconds: 0 },
    },
    {
      title: "Short Break",
      duration: { hours: 0, minutes: 5, seconds: 0 },
    },
    {
      title: "Focus",
      duration: { hours: 0, minutes: 25, seconds: 0 },
    },
    {
      title: "Long Break",
      duration: { hours: 0, minutes: 15, seconds: 0 },
    },
  ]);
  const [period, setPeriod] = useState(0);

  const getRemainingTime = () =>
    periods[period]?.remaining ?? periods[period].duration;

  const timer = useTimer({
    ...options,
    onTick: () => {
      const remaining = decrementDuration(getRemainingTime());

      setPeriods(
        periods.map((p, i) => (i === period ? { ...p, remaining } : p))
      );

      if (isDurationComplete(remaining)) {
        resetPeriod();

        if (period >= periods.length - 1) {
          stop();

          if (looping) {
            timer.start();
          }
        } else {
          setPeriod(period + 1);
        }
      }
    },
  });

  const stop = () => {
    timer.stop();
    setPeriod(0);
    setPeriods(periods.map((p) => ({ ...p, remaining: undefined })));
    options.onStop?.();
  };

  const addPeriod = (newPeriod: PomodoroPeriod) => {
    setPeriods(periods.concat(newPeriod));
  };

  const toggle = () => {
    if (isFinished) {
      stop();
    }

    timer.toggle();
  };

  const toggleLooping = () => setLooping(!looping);

  const getPercentCompleted = () => {
    if (period < periods.length) {
      const { hours, minutes, seconds } = periods[period].duration;
      const {
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      } = decrementDuration(getRemainingTime());

      return (
        ((remainingHours * 60 + remainingMinutes * 60 + remainingSeconds) /
          (hours * 60 + minutes * 60 + seconds)) *
        100
      );
    }

    return 100;
  };

  const updatePeriod = (periodData: Partial<PomodoroPeriod>) => {
    setPeriods(
      periods.map((p, i) => (i === period ? { ...p, ...periodData } : p))
    );
  };

  const resetPeriod = () => {
    updatePeriod({ remaining: undefined });
  };

  const skip = () => {
    resetPeriod();
    setPeriod(period < periods.length - 1 ? period + 1 : 0);
  };

  const previous = () => {
    resetPeriod();
    setPeriod(period > 0 ? period - 1 : periods.length - 1);
  };

  return {
    hasStarted: timer.hasStarted,
    isRunning: timer.isRunning,

    getPercentCompleted,
    periods,
    period,

    setPeriod: (period: number) => {
      resetPeriod();
      setPeriod(period);
    },
    skip,
    previous,

    addPeriod,
    toggle,
    stop,

    looping,
    toggleLooping,
  };
};
