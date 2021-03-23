import { withDesign } from "storybook-addon-designs";
import withTwindStory from "@twind/next/app";
import twindConfig from "../twind.config";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <Story />
    </>
  ),
  withDesign,
  (Story) => withTwindStory(twindConfig, <Story />),
];
