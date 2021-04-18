import { tw } from "twind";
import { Button, Icon } from "@components";
import { useTabs, useAudio, usePomodoro, useTheme } from "@hooks";
import { getHumanReadableDuration } from "@utils/timer";

export interface NavProps
  extends React.ClassAttributes<HTMLElement>,
    React.HTMLAttributes<HTMLElement> {}

export const Nav: React.FC<NavProps> = ({ className, ...props }) => {
  const { theme, styles, randomizeTheme } = useTheme();
  const { tab, setTab } = useTabs();
  const audio = useAudio();
  const pomodoro = usePomodoro();

  return (
    <nav
      className={tw(
        className,
        tw`absolute bottom-0 left-0 z-20 w-full lg:top-0 lg:h-28`
      )}
      {...props}
    >
      <div
        className={tw(
          `hidden justify-between lg:flex space-x-4 p-8 h-full w-full`
        )}
      >
        {/* <Button.Row>
          <Button.Link
            aria-label={"Music from Kenney.nl"}
            icon
            href="https://kenney.nl"
          >
            <Icon name="music" />
          </Button.Link>

          <Button.Link
            aria-label={"Open GitHub Repo"}
            icon
            href="https://github.com/jacob-shuman/pomodoro"
          >
            <Icon name="github" />
          </Button.Link>

          <Button.Link
            aria-label={"Jacob Shuman Portfolio"}
            icon
            href="https://jacob-shuman.ca"
          >
            <Icon name="person" />
          </Button.Link>
        </Button.Row> */}

        {/* <Button.Normal onClick={() => setTab("timer")}>
          <p className={tw(styles.font.title, ``)}>
            {pomodoro.period.title} &bull;{" "}
            {getHumanReadableDuration(
              pomodoro.period.remaining ?? pomodoro.period.duration
            )}
          </p>
        </Button.Normal> */}

        <div className={tw`w-32`} />

        <Button.Row>
          <Button.Normal
            aria-label={`Theme`}
            active={tab === "theme"}
            onClick={() => setTab("theme")}
          >
            <Icon name="palette" />

            <p className={tw(styles.font.title)}>Theme</p>
          </Button.Normal>

          <Button.Normal
            aria-label={`Timer`}
            active={tab === "timer"}
            onClick={() => setTab("timer")}
          >
            <Icon name="timer" />

            <p className={tw(styles.font.title)}>Timer</p>
          </Button.Normal>

          <Button.Normal
            aria-label={`Periods`}
            active={tab === "periods"}
            onClick={() => setTab("periods")}
          >
            <Icon name="periods" />

            <p className={tw(styles.font.title)}>Periods</p>
          </Button.Normal>

          <Button.Normal
            aria-label={`About`}
            active={tab === "about"}
            onClick={() => setTab("about")}
          >
            <Icon name="about" />

            <p className={tw(styles.font.title)}>About</p>
          </Button.Normal>
        </Button.Row>

        <Button.Row className={tw`w-32`}>
          <Button.Normal
            aria-label={`${pomodoro.looping ? "Disable" : "Enable"} Looping`}
            icon
            active={pomodoro.looping}
            onClick={pomodoro.toggleLooping}
          >
            <Icon name="repeat" />
          </Button.Normal>

          <Button.Normal
            aria-label={`${audio.isMuted ? "Unmute" : "Mute"} Audio`}
            icon
            active={!audio.isMuted}
            onClick={audio.toggleMute}
          >
            <Icon name={audio.isMuted ? "mute" : "unmute"} />
          </Button.Normal>
        </Button.Row>
      </div>

      {/* TODO: Create component for both desktop and mobile layouts */}
      <Button.Row
        className={tw(
          styles.rounded.top,

          `lg:hidden items-center justify-between p-8 w-full h-1/6`
        )}
      >
        <Button.Normal
          icon
          size="large"
          active={tab === "theme"}
          onClick={() => setTab("theme")}
        >
          <Icon name="palette" size="large" />
        </Button.Normal>

        <Button.Normal
          icon
          size="large"
          active={tab === "timer"}
          onClick={() => setTab("timer")}
        >
          <Icon name="timer" size="large" />
        </Button.Normal>

        <Button.Normal
          icon
          size="large"
          active={tab === "periods"}
          onClick={() => setTab("periods")}
        >
          <Icon name="periods" size="large" />
        </Button.Normal>

        <Button.Normal
          icon
          size="large"
          active={tab === "about"}
          onClick={() => setTab("about")}
        >
          <Icon name="about" size="large" />
        </Button.Normal>
      </Button.Row>
    </nav>
  );
};

export default Nav;
