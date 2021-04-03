// import React from "react";
// import { Story, Meta } from "@storybook/react";
// import { Button } from "@components";

// export default {
//   title: "Components/Button",
//   component: Button,
//   parameters: {
//     design: {
//       type: "figma",
//       url:
//         "https://www.figma.com/file/XRQIyA4XcfI0iUfDA9TW2n/Pomodoro-Timer?node-id=26%3A7",
//     },
//   },
// } as Meta;

// export const Active: Story<ButtonProps> = (args) => <Button.Normal {...args} />;
// Active.args = { children: "Active", active: true };

// export const Inactive: Story<ButtonProps> = (args) => <Button.Normal {...args} />;
// Inactive.args = { children: "Inactive" };

// export const Row: Story<{ count: number }> = ({ count }) => (
//   <Button.Row>
//     {[...Array(count > -1 ? count : 1)].map((_, i) => (
//       <Button.Normal>Button {i}</Button.Normal>
//     ))}
//   </Button.Row>
// );
// Row.args = {
//   count: 3,
// };
