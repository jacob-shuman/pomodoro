import { Story, Meta } from "@storybook/react";
import { Tabs, TabsProps } from "@components";
import { TabsProvider } from "@hooks";

export default {
  title: "Hooks/useTabs",
} as Meta;

export const Example: Story<TabsProps> = (args) => (
  <TabsProvider>
    <Tabs {...args} />
  </TabsProvider>
);
