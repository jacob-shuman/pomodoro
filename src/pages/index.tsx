import { tw } from "twind";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import Button from "../components/Button/Button";
import Icon from "../components/Icon/Icon";
import ButtonRow from "../components/ButtonRow/ButtonRow";
import PeriodCard from "../components/PeriodCard/PeriodCard";
import { useEffect, useState } from "react";
import usePomodoro from "../hooks/usePomodoro";
import { getHumanReadableDuration } from "../utils/timer";
import { useTheme } from "../hooks/useTheme";

const HomePage: React.FC = () => {
  const [tab, setTab] = useState<"queue" | "settings">("queue");
  const pomodoro = usePomodoro();
  const { theme } = useTheme();

  useEffect(() => {
    console.log("theme: ", theme);
  }, []);

  return (
    <div className={tw`flex items-center justify-center h-full space-x-32`}>
      <section
        className={tw`h-1/2 my-auto flex flex-col space-y-8 items-center`}
      >
        <ButtonRow>
          <Button active={tab === "queue"} onClick={() => setTab("queue")}>
            Queue
          </Button>
          <Button
            active={tab === "settings"}
            onClick={() => setTab("settings")}
          >
            Settings
          </Button>
        </ButtonRow>

        {tab === "queue" && pomodoro.periods && pomodoro.periods.length > 0 && (
          <ul className={tw`flex flex-col space-y-4`}>
            {pomodoro.periods.map((p, i) => (
              <li key={p.title + i}>
                <PeriodCard
                  active={pomodoro.period === i}
                  time={getHumanReadableDuration(p.duration)}
                  onClick={() => {
                    if (pomodoro.period !== i) {
                      pomodoro.setPeriod(i);
                    }
                  }}
                >
                  {p.title}
                </PeriodCard>
              </li>
            ))}
          </ul>
        )}

        {tab === "settings" && (
          <>
            <h1>Sync</h1>
            <h1>Theme</h1>
            <ButtonRow>
              <Button active>Red</Button>
              <Button>Blue</Button>
              <Button>Green</Button>
            </ButtonRow>
          </>
        )}
      </section>

      <section className={tw`flex flex-col space-y-16 items-center`}>
        <CircularProgressbarWithChildren
          className={tw`w-96`}
          counterClockwise
          value={pomodoro.getPercentCompleted()}
          styles={buildStyles({
            pathColor: "#D92430",
            trailColor: "transparent",
          })}
        >
          <div
            className={tw`flex flex-col space-y-8 text-4xl font-bold text-center text-white font-poppins`}
          >
            <h1>
              {pomodoro.periods[pomodoro.period] &&
                pomodoro.periods[pomodoro.period].title}
            </h1>
            {pomodoro.periods[pomodoro.period].remaining && (
              <h1>
                {getHumanReadableDuration(
                  pomodoro.periods[pomodoro.period].remaining
                )}
              </h1>
            )}
          </div>
        </CircularProgressbarWithChildren>

        <ButtonRow>
          <Button icon onClick={() => pomodoro.previous()}>
            <Icon name="rewind" />
          </Button>

          <Button icon onClick={() => pomodoro.toggle()}>
            <Icon name={pomodoro.isRunning ? "pause" : "play"} />
          </Button>

          <Button icon onClick={() => pomodoro.skip()}>
            <Icon name="skip" />
          </Button>
        </ButtonRow>
      </section>
    </div>
  );
};

export default HomePage;
