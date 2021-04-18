import { NormalButton, LinkButton, ButtonRow } from "./Button/Button";
import {
  PeriodCard,
  PeriodList,
  PeriodListItem,
  PeriodQueue,
} from "./Period/Period";

export * from "./AboutTab";
export * from "./Footer";
export * from "./Icon/Icon";
export * from "./List";
export * from "./Nav";
export * from "./PageBackground/PageBackground";
export * from "./Period/Period";
export * from "./PeriodsTab";
export * from "./Title/Title";
export * from "./ThemeTab";
export * from "./Timer";
export * from "./TimerTab";

export const Button = {
  Normal: NormalButton,
  Link: LinkButton,
  Row: ButtonRow,
};

export type {
  NormalButtonProps,
  LinkButtonProps,
  ButtonRowProps,
} from "./Button/Button";

export const Period = {
  Card: PeriodCard,
  List: PeriodList,
  ListItem: PeriodListItem,
  Queue: PeriodQueue,
};
