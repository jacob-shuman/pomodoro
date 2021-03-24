import { tw } from "twind";
import useTimer, { TimerDuration } from "../hooks/useTimer";
import Button from "../components/Button/Button";
import { decrementDuration } from "../utils/pomodoro";
import { useState } from "react";

export interface PomodoroPeriod {
  // Name of period
  title: string;

  // How long the period will last
  duration: TimerDuration;

  remaining?: TimerDuration;
}

export default function Home() {
  const [periods, setPeriods] = useState<PomodoroPeriod[]>([
    {
      title: "Focus",
      duration: { hours: 0, minutes: 0, seconds: 10 },
    },
  ]);
  const period: number = 0;

  const getRemainingTime = () =>
    periods[period]?.remaining ?? periods[period].duration;

  const timer = useTimer({
    onTick: () => {
      const remaining = decrementDuration(getRemainingTime());

      setPeriods([
        {
          title: "Focus",
          duration: { hours: 0, minutes: 0, seconds: 10 },
          remaining,
        },
      ]);

      if (
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        timer.stop();
        console.log("completed period!");
      }
    },
  });

  return (
    <main className={tw`flex flex-col p-16 space-y-8`}>
      <header className={tw`flex flex-col space-y-2`}>
        <h1 className={tw`text-4xl font-bold`}>Pomodoro</h1>
        <h2 className={tw`text-xl`}>{JSON.stringify(timer.elapsedTime)}</h2>
      </header>
      <br />

      <section>
        <div className={tw``}>
          <h3 className={tw`text-lg`}>Period: {period}</h3>
          <h4 className={tw`text-lg`}>
            {period < periods.length &&
              period > -1 &&
              JSON.stringify(periods[period])}
          </h4>
        </div>

        <div className={tw`flex flex-col space-y-8`}>
          <div className={tw`grid grid-cols-4 gap-x-8`}>
            <Button active onClick={() => timer.toggle()}>
              {timer.isRunning ? "Stop" : "Start"}
            </Button>

            <Button
              active
              onClick={() => {
                timer.set({ hours: 0, minutes: 0, seconds: 0 });
                setPeriods([
                  {
                    title: "Focus",
                    duration: { hours: 0, minutes: 0, seconds: 10 },
                  },
                ]);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
