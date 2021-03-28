import { tw } from "twind";
import { useTheme } from "@hooks";

export interface PeriodCardProps
  extends React.ClassAttributes<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  time?: string;
}

export const PeriodCard: React.FC<PeriodCardProps> = ({
  active,
  children,
  time,
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
        styles.font.title,

        active
          ? `bg-[${theme.button.background.active}] text-tomato-light-idle hover:(text-[${theme.button.text.hover}] bg-[${theme.button.background.hover}]) active:(text-tomato-light-active bg-tomato-deep-active)`
          : "bg-transparent text-tomato-medium-idle hover:(text-tomato-medium-hover) active:(text-tomato-medium-active)",
        "px-6 py-4 w-96 text-xl font-semibold"
      )}
    >
      <div className={tw`flex items-center justify-between`}>
        <p>{children}</p>
        <p>{time}</p>
      </div>
    </button>
  );
};

export interface PeriodListProps
  extends React.ClassAttributes<HTMLUListElement>,
    React.HTMLAttributes<HTMLUListElement> {}

export const PeriodList: React.FC<PeriodListProps> = ({
  children,
  ...props
}) => (
  <ul {...props} className={tw(props.className, tw`flex flex-col space-y-4`)}>
    {children}
  </ul>
);

export interface PeriodListItemProps
  extends React.ClassAttributes<HTMLLIElement>,
    React.HTMLAttributes<HTMLLIElement> {}

export const PeriodListItem: React.FC<PeriodListItemProps> = ({
  children,
  ...props
}) => (
  <li {...props} className={tw(props.className, tw`list-none`)}>
    {children}
  </li>
);
