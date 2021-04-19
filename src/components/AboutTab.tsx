import { tw } from "twind";
import { Button, Icon, List } from "@components";

export const AboutTab: React.FC = () => {
  return (
    <div
      className={tw`flex flex-col items-center justify-center h-full space-y-24`}
    >
      <Button.Link
        aria-label={"Navigate to Kenney.nl"}
        href="https://kenney.nl"
      >
        <Icon name="music" />

        <p>Audio from Kenney.nl</p>
      </Button.Link>

      <Button.Link
        aria-label={"Navigate to Hero Patterns"}
        href="https://www.heropatterns.com/"
      >
        <Icon name="background" />

        <p>Backgrounds from Hero Patterns</p>
      </Button.Link>

      <Button.Link
        aria-label={"Navigate to Project on GitHub"}
        href="https://github.com/jacob-shuman/pomodoro"
      >
        <Icon name="github" />

        <p>View Project on GitHub</p>
      </Button.Link>

      <Button.Link
        aria-label={"Navigate to Jacob Shuman Portfolio"}
        href="https://jacob-shuman.ca"
      >
        <Icon name="person" />

        <p>Built by Jacob Shuman</p>
      </Button.Link>
    </div>
  );
};

export default AboutTab;
