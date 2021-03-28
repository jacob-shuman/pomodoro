import React from "react";
import { Story, Meta } from "@storybook/react";
import { Checkbox, CheckboxProps } from "@components";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A7",
    },
  },
} as Meta;

export const Active: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Active.args = { children: "Active", active: true };

export const Inactive: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Inactive.args = { children: "Inactive" };
