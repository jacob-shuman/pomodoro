import { tw } from "twind";
import NextLink from "next/link";
import { ThemeState, useTheme } from "@hooks";
import { ThemeStyles } from "@models/theme";

export const getButtonClassName = ({
  className,
  theme,
  styles,
  icon,
  active,
  size,
}: Partial<LinkButtonProps & NormalButtonProps> & {
  className?: string;
  theme?: ThemeState;
  styles?: ThemeStyles;
}): string =>
  tw(
    className,

    styles.rounded,
    styles.transition,
    styles.transform,
    styles.focus,
    styles.hover,
    styles.font.body,

    icon ? (size === "large" ? `h-16 w-16` : `h-12 w-12`) : `px-16 py-2`,
    active
      ? `bg-[${theme.button.background.active}] text-[${theme.button.text.active}]`
      : `bg-transparent text-[${theme.button.text.inactive}]`,

    `font-bold`,
    `hover:(text-[${theme.button.text.hover}])`,
    `focus:(text-[${theme.button.text.active}])`,
    `active:(bg-[${theme.button.background.active}] ring-0)`
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
> = ({ active, icon, children, className, size = "small", ...props }) => {
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
      })}
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

export const ButtonRow: React.FC<ButtonRowProps> = ({ children, ...props }) => (
  <div
    className={tw(props.className, tw`flex items-center space-x-8`)}
    {...props}
  >
    {children}
  </div>
);
