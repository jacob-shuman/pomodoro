import { tw } from "twind";
import { Button, Icon } from "@components";
import { useTabs, useAudio, usePomodoro, useTheme } from "@hooks";

export interface NavProps
  extends React.ClassAttributes<HTMLElement>,
    React.HTMLAttributes<HTMLElement> {}

export const Nav: React.FC<NavProps> = ({ className, ...props }) => {
  const { styles, randomizeTheme } = useTheme();
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
          `hidden lg:flex space-x-4 justify-between p-8 h-full w-full`
        )}
      >
        <Button.Row>
          <Button.Normal aria-label={"About"} icon>
            <Icon name="help" />
          </Button.Normal>
          <Button.Link
            aria-label={"Open GitHub Repo"}
            icon
            href="https://github.com/jacob-shuman/pomodoro"
          >
            <Icon name="github" />
          </Button.Link>
        </Button.Row>

        <Button.Row>
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

          <Button.Normal aria-label={`Themes`} icon onClick={randomizeTheme}>
            <Icon name="palette" />
          </Button.Normal>

          {/* <Button.Normal
          className={tw`flex items-center space-x-4`}
          onClick={() => {
            
            // TODO: Use links instead of router
            
            router.replace("https://github.com/jacob-shuman/pomodoro");
          }}
          >
          <Icon name="github" />
          View on GitHub
          </Button.Normal>
          <Button.Normal
          className={tw`flex items-center space-x-4`}
          onClick={() => {
            
            // TODO: Use links instead of router
            
            router.replace("https://kenney.nl");
          }}
          >
          <Icon name="music" />
          Audio from Kenny.nl
          </Button.Normal>
          <Button.Normal
          className={tw`flex items-center space-x-4`}
          onClick={() => {
            
            // TODO: Use links instead of router
            
            router.replace("https://jacob-shuman.ca");
          }}
          >
          <Icon name="person" />
          Built by Jacob Shuman
        </Button.Normal> */}
        </Button.Row>
      </div>

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
          active={tab === "help"}
          onClick={() => setTab("help")}
        >
          <Icon name="help" size="large" />
        </Button.Normal>
      </Button.Row>
    </nav>
  );
};

export default Nav;
