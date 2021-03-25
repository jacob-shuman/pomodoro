import React from "react";
import { Story, Meta } from "@storybook/react";
import Icon, { IconProps } from "./Icon";

export default {
  title: "Components/Period Card",
  component: Icon,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A44",
    },
  },
} as Meta;

export const Skip: Story<IconProps> = (args) => <Icon {...args} />;
Skip.args = {};

export const Play: Story<IconProps> = (args) => <Icon {...args} />;
Play.args = {};

export const Rewind: Story<IconProps> = (args) => <Icon {...args} />;
Rewind.args = {};
