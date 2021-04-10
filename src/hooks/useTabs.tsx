import { createContext, useContext, useMemo, useState } from "react";

export type Tab = "theme" | "timer" | "periods" | "about";

export interface TabsProviderProps {
  children?: React.ReactNode;
  tab?: Tab;
}

export interface TabsContextProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

const TabsContext = createContext<TabsContextProps>({
  tab: "timer",
  setTab: () => {},
});

export const useTabs = () => useContext(TabsContext);

export function TabsProvider({ children, tab = "timer" }: TabsProviderProps) {
  const [tabState, setTabState] = useState<Tab>(useMemo(() => tab, [tab]));

  return (
    <TabsContext.Provider value={{ tab: tabState, setTab: setTabState }}>
      {children}
    </TabsContext.Provider>
  );
}

export default useTabs;
