import { tw } from "twind";
import { useTheme } from "../../hooks/useTheme";

const Title: React.FC<
  React.ClassAttributes<HTMLHeadingElement> &
    React.HTMLAttributes<HTMLHeadingElement>
> = ({ children, className, ...props }) => {
  const { theme } = useTheme();

  return (
    <h1
      {...props}
      className={tw(
        className,
        tw`text-4xl font-poppins font-bold text-[${theme.button.text.active}]`
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
