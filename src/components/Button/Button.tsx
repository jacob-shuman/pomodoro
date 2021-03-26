import { tw } from "twind";
import { useTheme } from "../../hooks/useTheme";

export interface ButtonProps
  extends React.ClassAttributes<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  active,
  icon,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <button
      {...props}
      className={tw(
        "rounded-xl font-raleway font-bold duration-300 ease-in-out transition transform hover:scale-105 active:scale-95",
        "focus:(outline-none ring-2 ring-offset-2 ring-offset-transparent ring-tomato-bright-active) hover:(outline-none ring-2 ring-offset-2 ring-offset-transparent ring-tomato-bright-active)",

        icon
          ? "h-16 w-16 focus:(text-tomato-light-hover) hover:(text-tomato-light-idle) active:(bg-tomato-bright-active)"
          : "px-16 py-2 active:(bg-tomato-bright-active ring-0)",
        active
          ? `bg-tomato-bright-idle text-[${theme.button.text.active}]`
          : `bg-transparent text-[${theme.button.text.inactive}]`
      )}
    >
      {children}
    </button>
  );
};

export default Button;
