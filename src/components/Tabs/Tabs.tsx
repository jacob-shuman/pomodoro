import { Button, ButtonRow } from "@components";
import { useTabs } from "@hooks";

export interface TabsProps {}

export const Tabs: React.FC<TabsProps> = ({ ...props }) => {
  const { tab, setTab } = useTabs();

  return (
    <ButtonRow {...props}>
      <Button active={tab === "queue"} onClick={() => setTab("queue")}>
        Queue
      </Button>
      <Button active={tab === "settings"} onClick={() => setTab("settings")}>
        Settings
      </Button>
    </ButtonRow>
  );
};
