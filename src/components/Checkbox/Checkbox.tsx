import { tw } from "twind";
import { useTheme } from "@hooks/useTheme/useTheme";

export interface CheckboxProps
  extends React.ClassAttributes<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  active,
  children,
  ...props
}) => {
  const { theme, styles } = useTheme();

  return (
    <button
      {...props}
      className={tw(
        props.className,

        styles.rounded,
        styles.transition,
        styles.transform,
        styles.focus,
        styles.hover,
        styles.font.body,

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
