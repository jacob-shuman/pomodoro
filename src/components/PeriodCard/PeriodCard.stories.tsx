import React from "react";
import { Story, Meta } from "@storybook/react";
import PeriodCard, { PeriodCardProps } from "./PeriodCard";

export default {
  title: "Components/Period Card",
  component: PeriodCard,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A44",
    },
  },
} as Meta;

export const Active: Story<PeriodCardProps> = (args) => (
  <PeriodCard {...args} />
);
Active.args = { children: "Active", active: true };

export const Inactive: Story<PeriodCardProps> = (args) => (
  <PeriodCard {...args} />
);
Inactive.args = { children: "Inactive" };
