import { createContext, useContext, useMemo, useState } from "react";
import { Tab } from "@models/tabs";

export interface TabsProviderProps {
  children?: React.ReactNode;
  tab?: Tab;
}

export interface TabsContextProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

const TabsContext = createContext<TabsContextProps>({
  tab: "queue",
  setTab: () => {},
});

export const useTabs = () => useContext(TabsContext);

export function TabsProvider({ children, tab = "queue" }: TabsProviderProps) {
  const [tabState, setTabState] = useState<Tab>(useMemo(() => tab, [tab]));

  return (
    <TabsContext.Provider value={{ tab: tabState, setTab: setTabState }}>
      {children}
    </TabsContext.Provider>
  );
}

export default useTabs;
