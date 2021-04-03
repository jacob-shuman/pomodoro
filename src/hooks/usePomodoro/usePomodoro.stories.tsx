import { tw } from "twind";
import { Story, Meta } from "@storybook/react";
import { Button } from "@components";
import { usePomodoro } from "@hooks";

export default {
  title: "Hooks/usePomodoro",
} as Meta;

export const Example: Story = () => {
  const pomodoro = usePomodoro();

  return (
    <main className={tw`flex flex-col p-16 space-y-8 text-white`}>
      <header className={tw`flex flex-col space-y-2`}>
        <h1 className={tw`text-4xl font-bold`}>Pomodoro</h1>
      </header>
      <br />

      <section>
        <div className={tw`text-xl`}>
          Periods:
          <pre>{pomodoro.periods && JSON.stringify(pomodoro.periods)}</pre>
        </div>
        <br />

        <div className={tw`text-xl`}>
          Current Period (Index {pomodoro.state.period}):
          <pre>{pomodoro.periods && JSON.stringify(pomodoro.period)}</pre>
        </div>
        <br />

        <p className={tw`text-lg`}>Looping: {String(pomodoro.looping)}</p>
      </section>

      <section>
        <div className={tw`grid grid-cols-2 gap-x-8 gap-y-4`}>
          <Button.Normal active onClick={() => pomodoro.toggle()}>
            {pomodoro.isRunning
              ? "Pause"
              : pomodoro.hasStarted
              ? "Resume"
              : "Start"}
          </Button.Normal>

          <Button.Normal
            active
            disabled={!pomodoro.isRunning}
            onClick={() => pomodoro.stop()}
          >
            Stop
          </Button.Normal>

          <Button.Normal active onClick={pomodoro.toggleLooping}>
            {pomodoro.looping ? "Disable Looping" : "Enable Looping"}
          </Button.Normal>

          <Button.Normal
            active
            onClick={() =>
              pomodoro.addPeriod({
                title: "Focus",
                duration: { hours: 0, minutes: 0, seconds: 5 },
              })
            }
          >
            Add 5 Second Period
          </Button.Normal>
        </div>
      </section>
    </main>
  );
};
