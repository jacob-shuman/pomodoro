import { useState } from "react";
import { tw } from "twind";
import { Button, Icon, List, Period, Timer } from "@components";

export const AboutTab: React.FC = () => {
  return (
    <div
      className={tw`flex flex-col items-center justify-center h-full space-y-24`}
    >
      <Button.Link aria-label={"Music from Kenney.nl"} href="https://kenney.nl">
        <Icon name="music" />

        <p>Audio from Kenney.nl</p>
      </Button.Link>

      <Button.Link
        aria-label={"Open GitHub Repo"}
        href="https://github.com/jacob-shuman/pomodoro"
      >
        <Icon name="github" />

        <p>View on GitHub</p>
      </Button.Link>

      <Button.Link
        aria-label={"Jacob Shuman Portfolio"}
        href="https://jacob-shuman.ca"
      >
        <Icon name="person" />

        <p>Built by Jacob Shuman</p>
      </Button.Link>
    </div>
  );
};

export default AboutTab;
