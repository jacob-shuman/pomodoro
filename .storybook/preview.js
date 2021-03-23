import { withDesign } from "storybook-addon-designs";
import withTwindStory from "@twind/next/app";
import twindConfig from "../twind.config";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  withDesign,
  (Story) => withTwindStory(twindConfig, <Story />),
];
