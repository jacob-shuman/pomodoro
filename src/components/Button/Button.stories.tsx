import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A7",
    },
  },
} as Meta;

// const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// export const Active = Template.bind({});
// Active.args = { children: "Active" };

// export const Inactive = Template.bind({});
// Inactive.args = { children: "Inactive" };

export const Active: Story<ButtonProps> = (args) => <Button {...args} />;
Active.args = { children: "Active", active: true };

export const Inactive: Story<ButtonProps> = (args) => <Button {...args} />;
Inactive.args = { children: "Inactive" };
