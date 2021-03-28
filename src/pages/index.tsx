import { useState } from "react";
import { useRouter } from "next/router";
import { tw, css } from "twind/css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Button, ButtonRow, Period, Icon, Title, Tabs } from "@components";
import { getHumanReadableDuration } from "@utils/timer";
import { useAudio, useTheme, usePomodoro, useTabs } from "@hooks";
import { Themes } from "@constants/theme";

const HomePage: React.FC = () => {
  const router = useRouter();
  const { tab } = useTabs();
  const audio = useAudio();
  const pomodoro = usePomodoro({
    onStart: () => audio.play(audio.kit.play),
    onPause: () => audio.play(audio.kit.pause),
  });
  const { theme, setTheme } = useTheme();

  return (
    <div className={tw`flex items-center justify-center h-full space-x-32`}>
      <section
        className={tw`flex flex-col items-center my-auto space-y-8 h-1/2`}
      >
        <Tabs />

        {/* TODO: Add gradient overlay to scroll container */}
        {/* <div
            className={tw(
              tw`absolute top-0 left-0 w-full h-full`,
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

        <div className={tw`px-4 py-8 overflow-y-scroll`}>
          {tab === "queue" && pomodoro.periods && pomodoro.periods.length > 0 && (
            <Period.List>
              {pomodoro.periods.map((p, i) => (
                <Period.ListItem key={p.title + i}>
                  <Period.Card
                    active={pomodoro.period === i}
                    time={getHumanReadableDuration(p.duration)}
                    onClick={() => {
                      if (pomodoro.period !== i) {
                        pomodoro.setPeriod(i);
                      }
                    }}
                  >
                    {p.title}
                  </Period.Card>
                </Period.ListItem>
              ))}
            </Period.List>
          )}

          {tab === "settings" && (
            <div className={tw`flex-col space-y-4 text-left`}>
              <Title>General</Title>
              <Button active onClick={() => pomodoro.toggleLooping()}>
                {pomodoro.looping ? "Disable" : "Enable"} Looping
              </Button>

              <div className={tw`flex items-center space-x-4 align-middle`}>
                <Title>Sync</Title>

                <Button icon>
                  <Icon name="help" />
                </Button>
              </div>

              <div className={tw`flex flex-col space-y-8`}>
                <Title>Theme</Title>
                <div className={tw`flex flex-col items-center space-y-4`}>
                  <ButtonRow>
                    <Button
                      onClick={() => {
                        setTheme(Themes.pomodoroRed);
                      }}
                    >
                      Red
                    </Button>
                    <Button
                      onClick={() => {
                        setTheme(Themes.anthoBlue);
                      }}
                    >
                      Blue
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
                <Title>About</Title>

                <div className={tw`flex flex-col items-center space-y-4`}>
                  <Button
                    className={tw`flex items-center space-x-4`}
                    onClick={() => {
                      {
                        /* TODO: Use links instead of router */
                      }
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
                      {
                        /* TODO: Use links instead of router */
                      }
                      router.replace("https://kenney.nl");
                    }}
                  >
                    <Icon name="music" />
                    Audio from Kenny.nl
                  </Button>
                  <Button
                    className={tw`flex items-center space-x-4`}
                    onClick={() => {
                      {
                        /* TODO: Use links instead of router */
                      }
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

      <section className={tw`flex flex-col items-center space-y-16`}>
        <CircularProgressbarWithChildren
          className={tw`w-96`}
          counterClockwise
          value={pomodoro.getPercentCompleted()}
          classes={{
            root: tw`transition duration-300 ease-in-out`,
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
