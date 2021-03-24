import { tw } from "twind";
import useTimer from "../hooks/useTimer";
import Button from "../components/Button/Button";

export default function Home() {
  const timer = useTimer();

  return (
    <>
      <h1 className={tw`text-xl`}>{JSON.stringify(timer.elapsedTime)}</h1>
      <br />

      <div className={tw`flex flex-col p-16 space-y-8`}>
        <div className={tw`grid grid-cols-4 gap-x-8`}>
          <Button active onClick={() => timer.rewind({ seconds: 10 })}>
            {"<<"} 10 Seconds
          </Button>

          <Button active onClick={() => timer.toggle()}>
            {timer.isRunning ? "Stop" : "Start"}
          </Button>

          <Button active onClick={() => timer.set({ seconds: 10 })}>
            Set To 10 Seconds
          </Button>

          <Button active onClick={() => timer.skip({ seconds: 10 })}>
            10 Seconds {">>"}
          </Button>
        </div>

        <Button active onClick={() => timer.reset()}>
          Reset
        </Button>
      </div>
    </>
  );
}
