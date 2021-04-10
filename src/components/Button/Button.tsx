import { tw } from "twind";
import NextLink from "next/link";
import { ThemeState, useTheme } from "@hooks";
import { ThemeStyles } from "@models/theme";

export const getButtonClassName = ({
  className = "",
  theme,
  styles,
  icon,
  active,
  size,
  disabled,
}: Partial<LinkButtonProps & NormalButtonProps> & {
  className?: string;
  disabled?: boolean;
  theme?: ThemeState;
  styles?: ThemeStyles;
}): string =>
  tw(
    className,

    styles.rounded.all,
    styles.transition,
    styles.transform,
    styles.focus,

    !className.includes(styles.font.title) &&
      !className.includes(styles.font.body) &&
      styles.font.body,

    icon ? (size === "large" ? `h-16 w-16` : `h-12 w-12`) : `px-4 py-2`,

    active
      ? `bg-[${theme.button.background.active}] text-[${theme.button.text.active}]`
      : disabled
      ? `bg-[${theme.button.background.disabled}] text-[${theme.button.text.disabled}] cursor-not-allowed`
      : tw(
          styles.hover,

          `bg-transparent text-[${theme.button.text.idle}]`,
          `hover:(bg-[${theme.button.background.hover}])`,
          `focus:(bg-[${theme.button.background.focus}] text-[${theme.button.text.focus}])`,
          `active:(bg-[${theme.button.background.pressed}] text-[${theme.button.text.pressed}] ring-0)`
        ),

    `font-bold flex items-center space-x-4`
  );

export interface NormalButtonProps {
  active?: boolean;
  icon?: boolean;
  size?: "small" | "large";
}

export const NormalButton: React.FC<
  NormalButtonProps &
    React.ClassAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  active,
  icon,
  children,
  className,
  disabled,
  size = "small",
  ...props
}) => {
  const { theme, styles } = useTheme();

  return (
    <button
      className={getButtonClassName({
        className,
        theme,
        styles,
        active,
        icon,
        size,
        disabled,
      })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export interface LinkButtonProps extends NormalButtonProps {
  href: string;
}

export const LinkButton: React.FC<
  LinkButtonProps &
    React.ClassAttributes<HTMLAnchorElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ children, className, active, icon, size, href, ...props }) => {
  const { theme, styles } = useTheme();

  return (
    <NextLink href={href}>
      <a
        className={tw(
          getButtonClassName({
            className,
            theme,
            styles,
            active,
            icon,
            size,
            href,
          })
        )}
        {...props}
      >
        {children}
      </a>
    </NextLink>
  );
};

export interface ButtonRowProps
  extends React.ClassAttributes<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {}

export const ButtonRow: React.FC<ButtonRowProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={tw(className, tw`flex items-center space-x-8`)} {...props}>
    {children}
  </div>
);
