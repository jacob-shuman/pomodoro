import { useCallback, useEffect } from "react";
import useInterval from "@use-it/interval";
import { useReduction } from "@hooks";

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
  onStart: (elapsedTime: TimerDuration) => void;
  onPause: (elapsedTime: TimerDuration) => void;
  onStop: (elapsedTime: TimerDuration) => void;
  onReset: (elapsedTime: TimerDuration) => void;
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

  setState(updatedState);
  onTick?.(updatedState.elapsedTime);
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
  const { isRunning, elapsedTime } = state;
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
  const onStart = useCallback(
    (elapsedTime: TimerDuration) => options?.onStart?.(elapsedTime),
    [options?.onStart]
  );
  const onPause = useCallback(
    (elapsedTime: TimerDuration) => options?.onPause?.(elapsedTime),
    [options?.onPause]
  );
  const onStop = useCallback(
    (elapsedTime: TimerDuration) => options?.onStop?.(elapsedTime),
    [options?.onStop]
  );
  const onReset = useCallback(
    (elapsedTime: TimerDuration) => options?.onReset?.(elapsedTime),
    [options?.onReset]
  );

  const start = () => {
    setState({ hasStarted: true, isRunning: true });
    onStart?.(elapsedTime);
  };

  const pause = () => {
    setState({ isRunning: false });
    onPause?.(elapsedTime);
  };

  const toggle = isRunning ? pause : start;

  const stop = () => {
    setState({
      hasStarted: false,
      isRunning: false,
      elapsedTime: { hours: 0, minutes: 0, seconds: 0 },
    });
    onStop?.(elapsedTime);
  };

  const reset = () => {
    setState({
      elapsedTime: { hours: 0, minutes: 0, seconds: 0 },
    });
    onReset?.(elapsedTime);
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
    () =>
      tick(elapsedTime, setState, {
        onHour,
        onMinute,
        onSecond,
        onTick,
        onStart,
        onPause,
        onStop,
        onReset,
      }),
    isRunning ? 1000 : null
  );

  return { ...state, start, pause, toggle, stop, reset, set, skip, rewind };
};

export default useTimer;
