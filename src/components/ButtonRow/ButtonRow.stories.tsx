import React from "react";
import { Story, Meta } from "@storybook/react";
import Button from "../Button/Button";
import { ButtonRow as _ButtonRow, ButtonRowProps } from "./ButtonRow";

export default {
  title: "Components/ButtonRow",
  component: _ButtonRow,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A7",
    },
  },
} as Meta;

export const ButtonRow: Story<ButtonRowProps> = (args) => (
  <_ButtonRow {...args} />
);
ButtonRow.args = {
  children: <Button>Button 1</Button>,
};
