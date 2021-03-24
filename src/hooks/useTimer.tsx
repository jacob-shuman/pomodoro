import { useCallback } from "react";
import useInterval from "@use-it/interval";
import { useReduction } from "./useReduction";

export interface TimerDuration {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimerDurationCallbacks {
  onHour: (elapsedTime: TimerDuration) => void;
  onMinute: (elapsedTime: TimerDuration) => void;
  onSecond: (elapsedTime: TimerDuration) => void;
}

export interface TimerCallbacks extends TimerDurationCallbacks {
  onTick: (elapsedTime: TimerDuration) => void;
}

export interface TimerState {
  hasStarted: boolean;
  isRunning: boolean;
  elapsedTime: TimerDuration;
}

export const DEFAULT_TIMER_STATE: TimerState = {
  hasStarted: false,
  isRunning: false,
  elapsedTime: { hours: 0, minutes: 0, seconds: 0 },
};

export const incrementDuration = (
  duration: TimerDuration,
  { onHour, onMinute, onSecond }: Partial<TimerDurationCallbacks>
): TimerDuration => {
  if (duration.seconds < 59) {
    const updatedDuration = { ...duration, seconds: duration.seconds + 1 };
    onSecond?.(updatedDuration);

    return updatedDuration;
  }

  if (duration.minutes < 59) {
    const updatedDuration = {
      ...duration,
      minutes: duration.minutes + 1,
      seconds: 0,
    };
    onMinute?.(updatedDuration);

    return updatedDuration;
  }

  const updatedDuration = {
    ...duration,
    hours: duration.hours + 1,
    minutes: 0,
    seconds: 0,
  };
  onHour?.(updatedDuration);

  return updatedDuration;
};

export const tick = (
  elapsedTime: TimerDuration,
  setState: React.Dispatch<Partial<TimerState>>,
  { onHour, onMinute, onSecond, onTick }: TimerCallbacks | undefined
) => {
  const updatedState = {
    elapsedTime: incrementDuration(elapsedTime, {
      onHour,
      onMinute,
      onSecond,
    }),
  };

  onTick?.(updatedState.elapsedTime);

  setState(updatedState);
};

export const useTimer = (
  options?: Partial<
    {
      initialState: Partial<
        TimerState | { elapsedTime: Partial<TimerDuration> }
      >;
    } & TimerCallbacks
  >
) => {
  const [state, setState] = useReduction<TimerState>(
    (options?.initialState && {
      ...DEFAULT_TIMER_STATE,
      ...options.initialState,

      elapsedTime: options?.initialState?.elapsedTime
        ? {
            ...DEFAULT_TIMER_STATE.elapsedTime,
            ...options?.initialState?.elapsedTime,
          }
        : DEFAULT_TIMER_STATE.elapsedTime,
    }) ??
      DEFAULT_TIMER_STATE
  );
  const { hasStarted, isRunning, elapsedTime } = state;
  const onTick = useCallback(
    (elapsedTime: TimerDuration) => options?.onTick?.(elapsedTime),
    [options?.onTick]
  );
  const onHour = useCallback(
    (elapsedTime: TimerDuration) => options?.onHour?.(elapsedTime),
    [options?.onHour]
  );
  const onMinute = useCallback(
    (elapsedTime: TimerDuration) => options?.onMinute?.(elapsedTime),
    [options?.onMinute]
  );
  const onSecond = useCallback(
    (elapsedTime: TimerDuration) => options?.onSecond?.(elapsedTime),
    [options?.onSecond]
  );

  const start = () => {
    setState({ hasStarted: true, isRunning: true });
  };

  const stop = () => {
    setState({ isRunning: false });
  };

  const toggle = isRunning ? stop : start;

  const reset = () => {
    setState({
      hasStarted: false,
      isRunning: false,
      elapsedTime: { hours: 0, minutes: 0, seconds: 0 },
    });
  };

  // TODO: Validate that seconds/minutes is less than 60 and update accordingly
  const set = (duration: Partial<TimerDuration>) => {
    setState({
      elapsedTime: { ...elapsedTime, ...duration },
    });
  };

  // TODO: Validate that seconds/minutes is less than 60 and update accordingly
  const skip = (duration: Partial<TimerDuration>) => {
    set(duration);
  };

  // TODO: Validate that seconds/minutes is less than 60 and update accordingly
  const rewind = (duration: Partial<TimerDuration>) => {
    set(duration);
  };

  useInterval(
    () => tick(elapsedTime, setState, { onHour, onMinute, onSecond, onTick }),
    isRunning ? 1000 : null
  );

  return { ...state, start, stop, toggle, reset, set, skip, rewind };
};

export default useTimer;
