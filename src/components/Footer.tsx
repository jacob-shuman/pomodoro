import { useTheme } from "@hooks";
import { tw } from "twind";

export interface FooterProps {
  app: { name: string; version: string };
}

export const Footer: React.FC<FooterProps> = ({ app, ...props }) => {
  const { theme, styles } = useTheme();

  return (
    <footer
      className={tw`absolute bottom-0 left-0 hidden lg:flex w-full z-20 space-x-4 justify-between p-8`}
      {...props}
    >
      <p
        className={tw(
          styles.font.body,
          tw`text-[${theme.button.text.inactive}] tracking-wider font-semibold opacity-25`
        )}
      >
        {app?.name} &bull; {app?.version}
      </p>
    </footer>
  );
};

export default Footer;
