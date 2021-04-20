import { createContext, useContext } from "react";
import { useReduction } from "@hooks";
import { useTimer } from "@hooks";
import { decrementDuration } from "@utils/timer";
import { PomodoroPeriod } from "@models/pomodoro";
import { isDurationComplete } from "@utils/timer";
import { DefaultPomodoroPeriods } from "@constants/pomodoro";

export interface PomodoroState {
  isFinished: boolean;
  looping: boolean;
  periods: PomodoroPeriod[];
  period: number;
}

export interface PomodoroProviderProps {
  children?: React.ReactNode;
  state?: PomodoroState;

  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;

  beforePeriodChange?: () => void;
  afterPeriodChange?: () => void;
}

export interface PomodoroContextProps {
  state: PomodoroState;

  looping: boolean;
  periods: PomodoroPeriod[];
  period: PomodoroPeriod;

  hasStarted: boolean;
  isRunning: boolean;

  getPercentCompleted: () => number;
  skip: () => void;
  previous: () => void;

  setPeriods: (periods: PomodoroPeriod[]) => void;
  setPeriod: (period: number) => void;
  resetPeriods: () => void;

  addPeriod: (newPeriod: PomodoroPeriod) => void;
  movePeriod: (source: number, destination: number) => void;
  removePeriod: (index: number) => void;

  toggle: () => void;
  start: () => void;
  pause: () => void;
  stop: () => void;

  toggleLooping: () => void;
}

export const DefaultPomodoroState: PomodoroState = {
  isFinished: false,
  looping: true,
  periods: DefaultPomodoroPeriods,
  period: 0,
};

const PomodoroContext = createContext<PomodoroContextProps>({
  state: DefaultPomodoroState,

  looping: false,
  periods: [],
  period: {} as PomodoroPeriod,

  hasStarted: false,
  isRunning: false,

  getPercentCompleted: () => 0,
  skip: () => {},
  previous: () => {},
  setPeriods: () => {},
  setPeriod: () => {},
  resetPeriods: () => {},
  addPeriod: () => {},
  movePeriod: () => {},
  removePeriod: () => {},
  toggle: () => {},
  start: () => {},
  pause: () => {},
  stop: () => {},
  toggleLooping: () => {},
});

export const usePomodoro = () => useContext(PomodoroContext);

export function PomodoroProvider({
  children,
  state = DefaultPomodoroState,
  onStart,
  onPause,
  onStop,
  beforePeriodChange,
  afterPeriodChange,
}: PomodoroProviderProps) {
  const [pomodoroState, setPomodoroState] = useReduction<PomodoroState>(state);
  const { isFinished, looping, periods, period } = pomodoroState;

  const timer = useTimer({
    onStart,
    onPause,

    onTick: () => {
      const remaining = decrementDuration(getRemainingTime());

      setPomodoroState({
        periods: periods.map((p, i) =>
          i === period ? { ...p, remaining } : p
        ),
      });

      if (isDurationComplete(remaining)) {
        resetPeriod();

        if (period >= periods.length - 1) {
          stop();

          if (looping) {
            timer.start();
          }
        } else {
          beforePeriodChange?.();
          setPomodoroState({ period: period + 1 });
          afterPeriodChange?.();
        }
      }
    },
  });

  const getRemainingTime = () =>
    periods[period]?.remaining ?? periods[period].duration;

  const start = () => timer.start();

  const pause = () => timer.pause();

  const stop = () => {
    timer.stop();

    beforePeriodChange?.();
    setPomodoroState({
      periods: periods.map((p) => ({ ...p, remaining: undefined })),
      period: 0,
    });
    afterPeriodChange?.();

    onStop?.();
  };

  const resetPeriods = () =>
    setPomodoroState({ period: 0, periods: DefaultPomodoroPeriods });

  const addPeriod = (newPeriod: PomodoroPeriod) => {
    setPomodoroState({ periods: periods.concat(newPeriod) });
  };

  const movePeriod = (source: number, destination: number) => {
    const updatedPeriods = periods;
    const period = periods.splice(source, 1);

    updatedPeriods.splice(destination, 0, ...period);

    beforePeriodChange?.();
    setPomodoroState({ periods: updatedPeriods });
    afterPeriodChange?.();
  };

  const removePeriod = (index: number) => {
    if (periods.length > 1) {
      const resetPeriod = period >= periods.length - 1;

      if (resetPeriod) {
        beforePeriodChange?.();
      }

      setPomodoroState({
        period: resetPeriod ? 0 : period,
        periods: periods.filter((p, i) => i !== index),
      });

      if (resetPeriod) {
        afterPeriodChange?.();
      }
    }
  };

  const toggle = () => {
    if (isFinished) {
      stop();
    }

    timer.toggle();
  };

  const toggleLooping = () => setPomodoroState({ looping: !looping });

  const getPercentCompleted = () => {
    if (period < periods.length) {
      const { hours, minutes, seconds } = periods[period].duration;
      const {
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      } = getRemainingTime();

      return (
        ((remainingHours * 60 + remainingMinutes * 60 + remainingSeconds) /
          (hours * 60 + minutes * 60 + seconds)) *
        100
      );
    }

    return 100;
  };

  const updatePeriod = (periodData: Partial<PomodoroPeriod>) => {
    setPomodoroState({
      periods: periods.map((p, i) =>
        i === period ? { ...p, ...periodData } : p
      ),
    });
  };

  const resetPeriod = () => {
    updatePeriod({ remaining: undefined });
  };

  const skip = () => {
    resetPeriod();

    beforePeriodChange?.();
    setPomodoroState({ period: period < periods.length - 1 ? period + 1 : 0 });
    afterPeriodChange?.();
  };

  const previous = () => {
    resetPeriod();

    beforePeriodChange?.();
    setPomodoroState({ period: period > 0 ? period - 1 : periods.length - 1 });
    afterPeriodChange?.();
  };

  return (
    <PomodoroContext.Provider
      value={{
        state: pomodoroState,

        hasStarted: timer.hasStarted,
        isRunning: timer.isRunning,

        getPercentCompleted,
        periods,
        period: periods[period],

        setPeriods: (periods: PomodoroPeriod[]) => {
          setPomodoroState({ period: 0, periods });
        },
        setPeriod: (period: number) => {
          resetPeriod();
          setPomodoroState({ period });
        },
        resetPeriods,

        addPeriod,
        movePeriod,
        removePeriod,

        toggle,
        start,
        pause,
        stop,
        skip,
        previous,

        looping,
        toggleLooping,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export default usePomodoro;
