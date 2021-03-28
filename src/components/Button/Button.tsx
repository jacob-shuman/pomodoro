import { tw } from "twind";
import { useTheme } from "@hooks/useTheme/useTheme";

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
  const { theme, style } = useTheme();

  return (
    <button
      {...props}
      className={tw(
        props.className,

        style.rounded,
        style.transition,
        style.transform,
        style.focus,
        style.hover,
        style.font.body,

        icon
          ? `h-16 w-16 focus:(text-tomato-light-hover) hover:(text-tomato-light-idle) active:(bg-tomato-bright-active)`
          : `px-16 py-2 active:(bg-[${theme.button.background}] ring-0)`,
        active
          ? `bg-[${theme.button.background.active}] text-[${theme.button.text.active}]`
          : `bg-transparent text-[${theme.button.text.inactive}]`,

        `font-bold`
      )}
    >
      {children}
    </button>
  );
};

export interface ButtonRowProps
  extends React.ClassAttributes<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {}

export const ButtonRow: React.FC<ButtonRowProps> = ({ children, ...props }) => (
  <div
    {...props}
    className={tw(props.className, tw`flex items-center space-x-8`)}
  >
    {children}
  </div>
);
