import { PeriodCard, PeriodList, PeriodListItem } from "./Period/Period";
import { QueueTab, SettingsTab } from "./Tab";

export * from "./Button/Button";
export * from "./Checkbox/Checkbox";
export * from "./Icon/Icon";
export * from "./List";
export * from "./PageBackground/PageBackground";
export * from "./Period/Period";
export * from "./Tabs/Tabs";
export * from "./Title/Title";
export * from "./Timer";

export const Tab = {
  Queue: QueueTab,
  Settings: SettingsTab,
};

export const Period = {
  Card: PeriodCard,
  List: PeriodList,
  ListItem: PeriodListItem,
};
