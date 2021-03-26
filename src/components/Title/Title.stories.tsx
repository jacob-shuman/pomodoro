import React from "react";
import { Story, Meta } from "@storybook/react";
import Title from "./Title";

export default {
  title: "Components/Title",
  component: Title,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A44",
    },
  },
} as Meta;

export const TitleText: Story = (args) => <Title {...args} />;
TitleText.args = { children: "Title", active: true };
