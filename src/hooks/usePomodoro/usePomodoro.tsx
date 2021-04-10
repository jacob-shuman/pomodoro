import { createContext, useContext } from "react";
import { useReduction } from "@hooks";
import { useTimer } from "@hooks";
import { decrementDuration } from "@utils/timer";
import { PomodoroPeriod } from "@models/pomodoro";
import { isDurationComplete } from "@utils/timer";

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

  setPeriod: (period: number) => void;
  addPeriod: (newPeriod: PomodoroPeriod) => void;
  removePeriod: (index: number) => void;

  toggle: () => void;
  stop: () => void;

  toggleLooping: () => void;
}

export const DefaultPomodoroState: PomodoroState = {
  isFinished: false,
  looping: true,
  periods: [
    {
      title: "Focus",
      duration: { hours: 0, minutes: 30, seconds: 0 },
    },
    {
      title: "Short Break",
      duration: { hours: 0, minutes: 5, seconds: 0 },
    },
    {
      title: "Focus",
      duration: { hours: 0, minutes: 30, seconds: 0 },
    },
    {
      title: "Short Break",
      duration: { hours: 0, minutes: 5, seconds: 0 },
    },
    {
      title: "Focus",
      duration: { hours: 0, minutes: 30, seconds: 0 },
    },
    {
      title: "Long Break",
      duration: { hours: 0, minutes: 15, seconds: 0 },
    },
  ],
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
  setPeriod: () => {},
  addPeriod: () => {},
  removePeriod: () => {},
  toggle: () => {},
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
          setPomodoroState({ period: period + 1 });
        }
      }
    },
  });

  const getRemainingTime = () =>
    periods[period]?.remaining ?? periods[period].duration;

  const stop = () => {
    timer.stop();
    setPomodoroState({
      periods: periods.map((p) => ({ ...p, remaining: undefined })),
      period: 0,
    });
    onStop?.();
  };

  const addPeriod = (newPeriod: PomodoroPeriod) => {
    setPomodoroState({ periods: periods.concat(newPeriod) });
  };

  const removePeriod = (index: number) => {
    if (periods.length > 1) {
      setPomodoroState({ periods: periods.filter((p, i) => i !== index) });
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
    setPomodoroState({ period: period < periods.length - 1 ? period + 1 : 0 });
  };

  const previous = () => {
    resetPeriod();
    setPomodoroState({ period: period > 0 ? period - 1 : periods.length - 1 });
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

        setPeriod: (period: number) => {
          resetPeriod();
          setPomodoroState({ period });
        },
        skip,
        previous,

        addPeriod,
        removePeriod,

        toggle,
        stop,

        looping,
        toggleLooping,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export default usePomodoro;
