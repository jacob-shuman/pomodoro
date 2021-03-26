import { tw } from "twind";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import Button from "../components/Button/Button";
import Icon from "../components/Icon/Icon";
import ButtonRow from "../components/ButtonRow/ButtonRow";
import Title from "../components/Title/Title";
import PeriodCard from "../components/PeriodCard/PeriodCard";
import { useEffect, useLayoutEffect, useState } from "react";
import usePomodoro from "../hooks/usePomodoro";
import { getHumanReadableDuration } from "../utils/timer";
import { useTheme } from "../hooks/useTheme";
import { DEFAULT_THEME } from "../constants/theme";
import { ThemeBackgroundImage } from "../models/theme";
import { getThemeBackgroundImageName } from "../utils/theme";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [tab, setTab] = useState<"queue" | "settings">("queue");
  const pomodoro = usePomodoro();
  const { theme, setTheme } = useTheme();

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
          <div className={tw`flex-col space-y-4 text-left`}>
            <Title>General</Title>
            <Button active onClick={() => pomodoro.toggleLooping()}>
              {pomodoro.looping ? "Disable" : "Enable"} Looping
            </Button>

            <div className={tw`flex items-center align-middle space-x-4`}>
              <Title>Sync</Title>

              <Button icon>
                <Icon className={tw``} name="help" />
              </Button>
            </div>

            <div className={tw`flex flex-col space-y-8`}>
              <Title>Theme</Title>
              <div className={tw`flex flex-col items-center space-y-4`}>
                <ButtonRow>
                  <Button
                    onClick={() => {
                      setTheme(DEFAULT_THEME.POMODORO_RED);
                    }}
                  >
                    Red
                  </Button>
                  <Button
                    onClick={() => {
                      setTheme(DEFAULT_THEME.ANTHO_BLUE);
                    }}
                  >
                    Blue
                  </Button>
                </ButtonRow>

                <ButtonRow>
                  <Button
                    onClick={() => {
                      setTheme({
                        ...theme,
                        background: {
                          ...theme.background,
                          image: ThemeBackgroundImage.random,
                        },
                      });
                    }}
                  >
                    Randomize Background
                  </Button>
                </ButtonRow>
              </div>
            </div>

            <div className={tw`flex flex-col space-y-8`}>
              <Title>Other</Title>

              <div className={tw`flex flex-col items-center space-y-4`}>
                <ButtonRow>
                  <Button
                    className={tw`flex items-center space-x-4`}
                    onClick={() => {
                      router.replace(
                        "https://github.com/jacob-shuman/pomodoro"
                      );
                    }}
                  >
                    <Icon name="github" />
                    Open GitHub
                  </Button>
                </ButtonRow>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className={tw`flex flex-col space-y-16 items-center`}>
        <CircularProgressbarWithChildren
          className={tw`w-96 duration-300 ease-in-out transition-colors`}
          counterClockwise
          value={pomodoro.getPercentCompleted()}
          styles={buildStyles({
            pathColor: theme.progress,
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
