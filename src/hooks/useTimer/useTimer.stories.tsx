import { Story, Meta } from "@storybook/react";
import { useTimer } from "./useTimer";

export default {
  title: "Hooks/useTimer",
  component: () => (
    <>
      <p>asdf</p>
    </>
  ),
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A7",
    },
  },
} as Meta;

// export const a = () => <div>div</div>;
// export const Active: Story<ButtonProps> = (args) => <Button {...args} />;
// Active.args = { children: "Active", active: true };

// export const Inactive: Story<ButtonProps> = (args) => <Button {...args} />;
// Inactive.args = { children: "Inactive" };
