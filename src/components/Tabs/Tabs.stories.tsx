import { Story, Meta } from "@storybook/react";
import { Tabs, TabsProps } from "@components";
import { TabsProvider } from "@hooks";

export default {
  title: "Components/Tabs",
} as Meta;

export const WithProvider: Story<TabsProps> = (args) => (
  <TabsProvider>
    <Tabs {...args} />
  </TabsProvider>
);

export const WithoutProvider: Story<TabsProps> = (args) => <Tabs {...args} />;
