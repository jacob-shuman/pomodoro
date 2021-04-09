import { useTheme } from "@hooks";
import { tw } from "twind";

export interface FooterProps {
  app: { name: string; version: string };
}

export const Footer: React.FC<FooterProps> = ({ app, ...props }) => {
  const { theme, styles } = useTheme();

  return (
    <footer
      className={tw`absolute bottom-0 left-0 z-20 justify-between hidden w-full p-8 space-x-4 lg:flex`}
      {...props}
    >
      <p
        className={tw(
          styles.font.body,
          tw`text-[${theme.button.text.idle}] tracking-wider font-semibold opacity-25`
        )}
      >
        {app?.name} &bull; {app?.version}
      </p>
    </footer>
  );
};

export default Footer;
