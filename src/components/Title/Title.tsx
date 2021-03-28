import { tw } from "twind";
import { useTheme } from "@hooks";

export const Title: React.FC<
  React.ClassAttributes<HTMLHeadingElement> &
    React.HTMLAttributes<HTMLHeadingElement>
> = ({ children, ...props }) => {
  const { theme, styles } = useTheme();

  return (
    <h1
      {...props}
      className={tw(
        props.className,

        styles.font.title,

        tw`text-4xl font-bold text-[${theme.button.text.active}]`
      )}
    >
      {children}
    </h1>
  );
};
