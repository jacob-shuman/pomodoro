import { tw } from "twind";
import useTimer, { TimerDuration } from "../hooks/useTimer";
import Button from "../components/Button/Button";
import { decrementDuration } from "../utils/timer";
import { useState } from "react";

export interface PomodoroPeriod {
  // Name of period
  title: string;

  // How long the period will last
  duration: TimerDuration;

  remaining?: TimerDuration;
}

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);
  const [loopOnFinish, setLoopOnFinish] = useState(false);
  const [periods, setPeriods] = useState<PomodoroPeriod[]>([
    {
      title: "Focus",
      duration: { hours: 0, minutes: 0, seconds: 5 },
    },
    {
      title: "Focus",
      duration: { hours: 0, minutes: 0, seconds: 5 },
    },
  ]);
  const [period, setPeriod] = useState(0);

  const getRemainingTime = () =>
    periods[period]?.remaining ?? periods[period].duration;

  const timer = useTimer({
    onTick: () => {
      const remaining = decrementDuration(getRemainingTime());

      setPeriods(
        periods.map((p, i) => (i === period ? { ...p, remaining } : p))
      );

      if (
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        setPeriod(period + 1);

        if (loopOnFinish && period >= periods.length - 1) {
          stop();
          timer.start();
        } else {
          if (period < periods.length - 1) {
            timer.reset();
          } else {
            stop();
          }
        }
      }
    },
  });

  const stop = () => {
    timer.stop();
    setPeriod(0);
    setPeriods(periods.map((p) => ({ ...p, remaining: undefined })));
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

  return (
    <main className={tw`flex flex-col p-16 space-y-8 text-white`}>
      <header className={tw`flex flex-col space-y-2`}>
        <h1 className={tw`text-4xl font-bold`}>Pomodoro</h1>

        <p className={tw`text-xl`}>
          Elapsed Time: {JSON.stringify(timer.elapsedTime)}
        </p>
      </header>
      <br />

      <section>
        <div className={tw`text-xl`}>
          Periods:
          <pre>{periods && JSON.stringify(periods)}</pre>
        </div>
        <br />

        <div className={tw`text-xl`}>
          Current Period (Index {period}):
          <pre>{periods && JSON.stringify(periods[period])}</pre>
        </div>
        <br />

        <p className={tw`text-lg`}>Looping: {String(loopOnFinish)}</p>
      </section>

      <section>
        <div className={tw`grid grid-cols-2 gap-x-8 gap-y-4`}>
          <Button active onClick={() => toggle()}>
            {timer.isRunning ? "Pause" : timer.hasStarted ? "Resume" : "Start"}
          </Button>

          <Button active disabled={!timer.isRunning} onClick={() => stop()}>
            Stop
          </Button>

          <Button active onClick={() => setLoopOnFinish(!loopOnFinish)}>
            {loopOnFinish ? "Disable Looping" : "Enable Looping"}
          </Button>

          <Button
            active
            onClick={() =>
              addPeriod({
                title: "Focus",
                duration: { hours: 0, minutes: 0, seconds: 5 },
              })
            }
          >
            Add 5 Second Period
          </Button>
        </div>
      </section>
    </main>
  );
}
