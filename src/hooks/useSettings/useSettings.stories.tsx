import { tw } from "twind";
import { Story, Meta } from "@storybook/react";
import { useSettings } from "./useSettings";

export default {
  title: "Hooks/useSettings",
} as Meta;

export const Example: Story = () => {
  const settings = useSettings();
  return <p className={tw`text-xl text-white`}>{JSON.stringify(settings)}</p>;
};
