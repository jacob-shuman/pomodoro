import useInterval from "@use-it/interval";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PomodoroPeriod,
  PomodoroDurationOld,
  PomodoroError,
} from "@models/pomodoro";
// import { decrementDuration } from "@utils/timer";
// import { isPeriodComplete, isValidPeriod } from "@utils/pomodoro";
// import { useReduction } from "./useReduction";

// export class PomodoroTimer {
//   private periodIndex: number = 0;
//   private periods: PomodoroPeriod[] = [];
//   private periodChanged = true;
//   private periodCounter: PomodoroDuration = {
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   };

//   private intervalId?: number;

//   onPeriodChange?: (
//     period: PomodoroPeriod,
//     nextPeriod: PomodoroPeriod,
//     prevPeriod: PomodoroPeriod
//   ) => void;
//   onStart?: () => void;
//   onStop?: () => void;
//   onReset?: () => void;

//   onHour?: (remainingTime: PomodoroDuration) => void;
//   onMinute?: (remainingTime: PomodoroDuration) => void;
//   onSecond?: (remainingTime: PomodoroDuration) => void;

//   public get period(): PomodoroPeriod {
//     return this.periods[this.periodIndex];
//   }

//   running: boolean = false;

//   constructor(options: {
//     periods: PomodoroPeriod[];
//     startImmediately?: boolean;
//     onPeriodChange?: (
//       period: PomodoroPeriod,
//       nextPeriod: PomodoroPeriod,
//       prevPeriod: PomodoroPeriod
//     ) => void;
//     onStart?: () => void;
//     onStop?: () => void;
//     onReset?: () => void;
//     onHour?: (remainingTime: PomodoroDuration) => void;
//     onMinute?: (remainingTime: PomodoroDuration) => void;
//     onSecond?: (remainingTime: PomodoroDuration) => void;
//   }) {
//     const { periods, startImmediately, onPeriodChange } = options;

//     if (periods.length < 1) {
//       throw Error(PomodoroError.MISSING_PERIODS);
//     } else if (periods.some((p) => !isValidPeriod(p))) {
//       throw Error(PomodoroError.INVALID_PERIOD);
//     }

//     this.periods = periods;
//     this.onPeriodChange = onPeriodChange;
//     this.periodCounter = { ...this.periods[this.periodIndex].duration };

//     if (startImmediately) {
//       this.start();
//     }
//   }

//   start(): void {
//     if (!this.running) {
//       this.intervalId = setInterval(() => {
//         if (this.periodChanged && this.onPeriodChange) {
//           this.periodChanged = false;

//           const nextPeriod =
//             this.periodIndex < this.periods.length - 1
//               ? this.periodIndex + 1
//               : 0;

//           const prevPeriod =
//             this.periodIndex > 0
//               ? this.periodIndex - 1
//               : this.periods.length - 1;

//           this.onPeriodChange!(
//             this.periods[this.periodIndex],
//             this.periods[nextPeriod],
//             this.periods[prevPeriod]
//           );
//         }

//         if (this.periodCounter.hours > 0) {
//           if (this.periods[this.periodIndex].onHour) {
//             this.periods[this.periodIndex].onHour!(this.periodCounter);
//           }

//           if (this.onHour) {
//             this.onHour!(this.periodCounter);
//           }
//         }

//         if (this.periodCounter.minutes > 0) {
//           if (this.periods[this.periodIndex].onMinute) {
//             this.periods[this.periodIndex].onMinute!(this.periodCounter);
//           }

//           if (this.onMinute) {
//             this.onMinute!(this.periodCounter);
//           }
//         }

//         if (this.periodCounter.seconds > 0) {
//           if (this.periods[this.periodIndex].onSecond) {
//             this.periods[this.periodIndex].onSecond!(this.periodCounter);
//           }

//           if (this.onSecond) {
//             this.onSecond!(this.periodCounter);
//           }
//         }

//         if (this.periodCounter.seconds > 1) {
//           this.periodCounter.seconds--;
//         } else if (this.periodCounter.minutes > 1) {
//           this.periodCounter.minutes--;
//           this.periodCounter.seconds = 59;
//         } else if (this.periodCounter.hours > 1) {
//           this.periodCounter.hours--;
//           this.periodCounter.minutes = 59;
//           this.periodCounter.seconds = 59;
//         } else if (
//           this.periodCounter.hours < 2 &&
//           this.periodCounter.minutes < 2 &&
//           this.periodCounter.seconds < 2
//         ) {
//           if (this.periodIndex < this.periods.length - 1) {
//             this.periodIndex++;
//           } else {
//             this.periodIndex = 0;
//           }

//           this.periodCounter = { ...this.periods[this.periodIndex].duration };
//           this.periodChanged = true;
//         }
//       }, 1000);

//       this.running = true;

//       if (this.onStart) {
//         this.onStart();
//       }
//     }
//   }

//   stop(): void {
//     if (this.running) {
//       clearInterval(this.intervalId);

//       this.running = false;

//       if (this.onStop) {
//         this.onStop();
//       }
//     }
//   }

//   reset(): void {
//     if (this.running) {
//       this.stop();
//     }

//     this.periodIndex = 0;

//     if (this.onReset) {
//       this.onReset();
//     }
//   }

//   toggleState(): void {
//     if (this.running) {
//       this.stop();
//     } else {
//       this.start();
//     }
//   }

//   addPeriod(period: PomodoroPeriod): void {
//     this.periods.push(period);
//   }
// }

export interface PomodoroTimer {
  running: boolean;
  periods: PomodoroPeriod[];

  currentPeriod?: number;
}

export interface usePomodoroProps {
  initialTimer?: PomodoroTimer;
}

export const usePomodoro = ({ initialTimer }: usePomodoroProps = {}) => {
  // const [timer, setTimer] = useReduction<PomodoroTimer>(
  //   initialTimer ?? {
  //     running: false,
  //     periods: [
  //       {
  //         title: "Focus Period",
  //         duration: { hours: 0, minutes: 0, seconds: 5 },
  //       },
  //     ],
  //   }
  // );
  // const period = useRef<PomodoroPeriod>(timer.periods[0]);
  // useEffect(() => {
  //   period.current = timer.periods[timer.currentPeriod];
  // }, [timer]);
  // useInterval(
  //   () => {
  //     const remainingTime = decrementDuration(
  //       timer.periods[timer.currentPeriod ?? 0].remainingTime ??
  //         timer.periods[timer.currentPeriod ?? 0].duration
  //     );
  //     console.log("ran");
  //     setTimer({
  //       periods: timer.periods.map((p, i) =>
  //         i === timer.currentPeriod ? { ...p, remainingTime } : p
  //       ),
  //       running: !isPeriodComplete(timer.periods[timer.currentPeriod ?? 0]),
  //     });
  //     // period.current = timer.periods[timer.currentPeriod];
  //   },
  //   timer.running ? 1000 : null
  // );
  // const start = () => {
  //   if (
  //     !timer.running &&
  //     (!period.current || !isPeriodComplete(period.current))
  //   ) {
  //     setTimer({
  //       currentPeriod: timer.currentPeriod ?? 0,
  //       running: true,
  //     });
  //   }
  // };
  // const stop = () => {
  //   setTimer({ running: false });
  // };
  // return {
  //   timer,
  //   period: period.current,
  //   start,
  //   stop,
  // };
};

export default usePomodoro;
