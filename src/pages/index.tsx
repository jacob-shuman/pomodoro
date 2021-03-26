import { tw, css } from "twind/css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import Button from "../components/Button/Button";
import Icon from "../components/Icon/Icon";
import ButtonRow from "../components/ButtonRow/ButtonRow";
import Title from "../components/Title/Title";
import PeriodCard from "../components/PeriodCard/PeriodCard";
import { useEffect, useLayoutEffect, useState } from "react";
import usePomodoro from "../hooks/usePomodoro";
import { getHumanReadableDuration } from "../utils/timer";
import { useAudio } from "../hooks/useAudio";
import { useTheme } from "../hooks/useTheme";
import { DEFAULT_THEME } from "../constants/theme";
import { ThemeBackgroundImage } from "../models/theme";
import { getRgb, getThemeBackgroundImageName } from "../utils/theme";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [tab, setTab] = useState<"queue" | "settings">("queue");
  const audio = useAudio();
  const pomodoro = usePomodoro({
    onStart: () => audio.play("./audio/pepSound2.ogg"),
    onPause: () => audio.play("./audio/pepSound1.ogg"),
  });
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

        {/* TODO: Add gradient overlay to scroll container */}
        {/* <div
            className={tw(
              tw`absolute w-full h-full top-0 left-0`,
              css`
                background: rgb(255, 255, 255);
                background: -moz-linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(${getRgb(theme.background.color)}, 0.25) 80%,
                  rgba(${getRgb(theme.background.color)}, 0.5) 90%,
                  rgba(${getRgb(theme.background.color)}, 0.95) 100%
                );
                background: -webkit-linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(${getRgb(theme.background.color)}, 0.25) 80%,
                  rgba(${getRgb(theme.background.color)}, 0.5) 90%,
                  rgba(${getRgb(theme.background.color)}, 0.95) 100%
                );
                background: linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(${getRgb(theme.background.color)}, 0.25) 80%,
                  rgba(${getRgb(theme.background.color)}, 0.5) 90%,
                  rgba(${getRgb(theme.background.color)}, 0.95) 100%
                );
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ff0000",GradientType=1);
              `
            )}
          ></div> */}

        <div className={tw`py-8 px-4 overflow-y-scroll`}>
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
                <Title>Audio</Title>
                <Button active onClick={() => audio.toggleMute()}>
                  {audio.isMuted ? "Unmute" : "Mute"} Audio
                </Button>
              </div>

              <div className={tw`flex flex-col space-y-8`}>
                <Title>Other</Title>

                <div className={tw`flex flex-col items-center space-y-4`}>
                  <Button
                    className={tw`flex items-center space-x-4`}
                    onClick={() => {
                      router.replace(
                        "https://github.com/jacob-shuman/pomodoro"
                      );
                    }}
                  >
                    <Icon name="github" />
                    View on GitHub
                  </Button>
                  <Button
                    className={tw`flex items-center space-x-4`}
                    onClick={() => {
                      router.replace("https://kenney.nl");
                    }}
                  >
                    <Icon name="music" />
                    Audio from Kenny.nl
                  </Button>
                  <Button
                    className={tw`flex items-center space-x-4`}
                    onClick={() => {
                      router.replace("https://jacob-shuman.ca");
                    }}
                  >
                    <Icon name="person" />
                    Built by Jacob Shuman
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={tw`flex flex-col space-y-16 items-center`}>
        <CircularProgressbarWithChildren
          className={tw`w-96`}
          counterClockwise
          value={pomodoro.getPercentCompleted()}
          classes={{
            root: tw`duration-300 ease-in-out transition`,
            trail: "",
            // TODO: Add stroke-linecap to theme object
            path: tw(
              tw`stroke-current text-[${theme.progress}]`,
              css`
                stroke-linecap: round;
              `
            ),
            text: "",
            background: "",
          }}
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

          <Button
            icon
            onClick={() => {
              pomodoro.toggle();
            }}
          >
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
