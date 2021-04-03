import React from "react";
import { Story, Meta } from "@storybook/react";
import { Button, LinkButtonProps, NormalButtonProps } from "@components";

export default {
  title: "Components/Button",
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A7",
    },
  },
} as Meta;

export const Normal: Story<NormalButtonProps> = (args) => (
  <Button.Normal {...args}>Normal</Button.Normal>
);
Normal.args = { active: true };

export const Link: Story<LinkButtonProps> = (args) => (
  <Button.Link {...args}>Link</Button.Link>
);

export const Row: Story<{ count: number }> = ({ count }) => (
  <Button.Row>
    {[...Array(count > -1 ? count : 1)].map((_, i) => (
      <Button.Normal>Button {i}</Button.Normal>
    ))}
  </Button.Row>
);
Row.args = {
  count: 3,
};
