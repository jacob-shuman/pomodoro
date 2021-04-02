import { tw } from "twind";
import { usePomodoro, useTabs } from "@hooks";
import { Tabs, Timer, List, Tab } from "@components";

const DesignPage: React.FC = () => {
  const { tab } = useTabs();
  const pomodoro = usePomodoro();

  return (
    <div className={tw`flex items-center justify-center h-full space-x-32`}>
      <section
        className={tw`flex flex-col items-center my-auto space-y-8 h-2/3`}
      >
        <Tabs />

        <List>
          {tab === "queue" &&
            pomodoro.periods &&
            pomodoro.periods.length > 0 && <Tab.Queue />}

          {tab === "settings" && <Tab.Settings />}
        </List>
      </section>

      <Timer />
    </div>
  );
};

export default DesignPage;
