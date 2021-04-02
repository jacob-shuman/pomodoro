import { tw, css } from "twind/css";
import { usePomodoro, useTheme } from "@hooks";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Button, ButtonRow, Icon } from "@components";
import { getHumanReadableDuration } from "@utils/timer";

export interface TimerProps {
  value?: number;
  hideControls?: boolean;
}

export const TimerChildren: React.FC = () => {
  const pomodoro = usePomodoro();

  return (
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
        className={tw`w-96`}
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
      )}
    </section>
  );
};
