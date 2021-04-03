import { tw } from "twind";
import { Button, Icon } from "@components";
import { useAudio, usePomodoro, useTheme } from "@hooks";

export interface NavProps
  extends React.ClassAttributes<HTMLElement>,
    React.HTMLAttributes<HTMLElement> {}

export const Nav: React.FC<NavProps> = ({ className, ...props }) => {
  const audio = useAudio();
  const { theme, styles, randomizeTheme } = useTheme();
  const pomodoro = usePomodoro();

  return (
    <nav
      className={tw(
        className,
        tw`absolute bottom-0 left-0 lg:top-0 w-full lg:h-28 z-20`
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

          `lg:hidden items-center justify-between p-8 bg-[${theme.button.background.active}] w-full h-1/6`
        )}
      >
        <Button.Normal icon size="large">
          <Icon name="palette" size="large" />
        </Button.Normal>

        <Button.Normal icon active size="large">
          <Icon name="timer" size="large" />
        </Button.Normal>

        <Button.Normal icon size="large">
          <Icon name="periods" size="large" />
        </Button.Normal>

        <Button.Normal icon size="large">
          <Icon name="help" size="large" />
        </Button.Normal>
      </Button.Row>
    </nav>
  );
};

export default Nav;
