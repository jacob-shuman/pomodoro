import { tw } from "twind";
import { Period, Title, Button, ButtonRow, Icon } from "@components";
import { useAudio, usePomodoro, useTheme } from "@hooks";
import { getHumanReadableDuration } from "@utils/timer";
import { Themes } from "@constants/theme";
import { useRouter } from "next/router";

export const QueueTab: React.FC = () => {
  const pomodoro = usePomodoro();

  return (
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
  );
};

export const SettingsTab: React.FC = () => {
  const audio = useAudio();
  const { setTheme } = useTheme();
  const pomodoro = usePomodoro();
  const router = useRouter();

  return (
    <div className={tw`flex-col space-y-4 text-left`}>
      <Title>General</Title>
      <Button active onClick={() => pomodoro.toggleLooping()}>
        {pomodoro.looping ? "Disable" : "Enable"} Looping
      </Button>

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
              router.replace("https://github.com/jacob-shuman/pomodoro");
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
  );
};
