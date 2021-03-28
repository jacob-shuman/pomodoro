import React from "react";
import { Story, Meta } from "@storybook/react";
import { Period, PeriodCardProps } from "@components";

export default {
  title: "Components/Period",
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A44",
    },
  },
} as Meta;

export const Active: Story<PeriodCardProps> = (args) => (
  <Period.Card {...args} />
);
Active.args = { children: "Active", active: true, time: "25:00" };

export const Inactive: Story<PeriodCardProps> = (args) => (
  <Period.Card {...args} />
);
Inactive.args = { children: "Inactive", time: "25:00" };

export const List: Story<{ count: number; active: number }> = ({
  count,
  active,
}) => (
  <Period.List>
    {[...Array(count > -1 ? count : 1)].map((_, i) => (
      <Period.ListItem>
        <Period.Card active={active === i}>Button {i}</Period.Card>
      </Period.ListItem>
    ))}
  </Period.List>
);
List.args = {
  count: 3,
  active: 0,
};
