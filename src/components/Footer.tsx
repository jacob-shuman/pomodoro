import { tw } from "twind";
import { useTheme } from "@hooks";
import { Button, Icon } from "@components";

export interface FooterProps {
  app: { name: string; version: string };
}

export const Footer: React.FC<FooterProps> = ({ app, ...props }) => {
  const { theme, styles } = useTheme();

  return (
    <footer
      className={tw(
        styles.font.body,
        `absolute bottom-0 left-0 z-20 items-center justify-start hidden w-full p-8 space-x-4 lg:flex`
      )}
      {...props}
    >
      <Button.Link
        href="google.com"
        className={tw(
          `flex items-center justify-start space-x-4`,
          `text-[${theme.button.text.idle}] tracking-wider font-semibold opacity-25`
        )}
      >
        <Icon name="github" />

        <p className={tw()}>
          {app?.name} &bull; {app?.version}
        </p>
      </Button.Link>
    </footer>
  );
};

export default Footer;
