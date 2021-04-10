import { tw, css } from "twind/css";
import { usePomodoro, useTheme } from "@hooks";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Button, Icon } from "@components";
import { getHumanReadableDuration } from "@utils/timer";

export interface TimerProps {
  value?: number;
  hideControls?: boolean;
}

export const TimerChildren: React.FC = () => {
  const pomodoro = usePomodoro();
  const { theme } = useTheme();

  return (
    <div
      className={tw`flex flex-col space-y-8 text-4xl font-bold text-center text-white font-poppins`}
    >
      <h1 className={tw`text-[${theme.timer.title}]`}>
        {pomodoro.period && pomodoro.period.title}
      </h1>

      <h1 className={tw`text-[${theme.timer.duration}]`}>
        {getHumanReadableDuration(
          pomodoro.period.remaining ?? pomodoro.period.duration
        )}
      </h1>
    </div>
  );
};

export const Timer: React.FC<
  React.ClassAttributes<HTMLElement> &
    React.HTMLAttributes<HTMLElement> &
    TimerProps
> = ({ value, hideControls, children, ...props }) => {
  const { theme, styles } = useTheme();
  const pomodoro = usePomodoro();

  return (
    <section className={tw`flex flex-col items-center space-y-16`} {...props}>
      <CircularProgressbarWithChildren
        className={tw`w-72 lg:w-96`}
        counterClockwise
        value={value ?? pomodoro.getPercentCompleted()}
        classes={{
          root: styles.transition,
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
        {children ?? <TimerChildren />}
      </CircularProgressbarWithChildren>

      {!hideControls && (
        <Button.Row>
          <Button.Normal
            aria-label="Previous Period"
            icon
            size="large"
            onClick={() => pomodoro.previous()}
          >
            <Icon name="rewind" size="large" />
          </Button.Normal>

          <Button.Normal
            aria-label={pomodoro.isRunning ? "Pause Timer" : "Play Timer"}
            icon
            size="large"
            onClick={() => {
              pomodoro.toggle();
            }}
          >
            <Icon name={pomodoro.isRunning ? "pause" : "play"} size="large" />
          </Button.Normal>

          <Button.Normal
            aria-label="Skip Period"
            icon
            size="large"
            onClick={() => pomodoro.skip()}
          >
            <Icon name="skip" size="large" />
          </Button.Normal>
        </Button.Row>
      )}
    </section>
  );
};
