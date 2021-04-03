import { tw } from "twind";
import { Button, Icon } from "@components";
import { useAudio, usePomodoro, useTheme } from "@hooks";

export interface NavProps
  extends React.ClassAttributes<HTMLElement>,
    React.HTMLAttributes<HTMLElement> {}

export const Nav: React.FC<NavProps> = ({ className, ...props }) => {
  const audio = useAudio();
  const { randomizeTheme } = useTheme();
  const pomodoro = usePomodoro();

  return (
    <nav
      className={tw(
        className,
        tw`absolute bottom-0 left-0 md:top-0 w-full z-20 flex space-x-4 justify-between p-8 h-28`
      )}
      {...props}
    >
      <Button.Row>
        <Button.Normal icon>
          <Icon name="help" />
        </Button.Normal>
        <Button.Link icon href="https://github.com/jacob-shuman/pomodoro">
          <Icon name="github" />
        </Button.Link>
      </Button.Row>

      <Button.Row>
        <Button.Normal
          icon
          active={pomodoro.looping}
          onClick={pomodoro.toggleLooping}
        >
          <Icon name="repeat" />
        </Button.Normal>
        <Button.Normal icon active={!audio.isMuted} onClick={audio.toggleMute}>
          <Icon name={audio.isMuted ? "mute" : "unmute"} />
        </Button.Normal>
        <Button.Normal icon onClick={randomizeTheme}>
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
    </nav>
  );
};

export default Nav;
