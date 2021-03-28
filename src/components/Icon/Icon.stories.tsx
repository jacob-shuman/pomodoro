import React from "react";
import { Story, Meta } from "@storybook/react";
import { Icon, IconProps } from "@components";

export default {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A44",
    },
  },
} as Meta;

export const One: Story<IconProps> = (args) => <Icon {...args} />;
One.args = { name: "play" };
