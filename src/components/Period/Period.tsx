import { tw } from "twind";
import { usePomodoro, useTheme } from "@hooks";
import { getHumanReadableDuration } from "@utils/timer";

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
          ? `bg-[${theme.button.background.active}] text-[${theme.button.text.active}] hover:(text-[${theme.button.text.hover}] bg-[${theme.button.background.hover}])`
          : `bg-transparent text-[${theme.button.text.inactive}] hover:(text-[${theme.button.text.hover}])`,

        "px-6 py-4 w-96 text-xl font-semibold",
        `active:(text-[${theme.button.text.active}] bg-[${theme.button.background.active}] ring-0)`
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
  className,
  ...props
}) => (
  <ul
    {...props}
    className={tw(
      className,
      tw`flex flex-col space-y-4 overflow-y-scroll w-full items-center p-4`
    )}
  >
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

export const PeriodQueue: React.FC = () => {
  const pomodoro = usePomodoro();

  return (
    <PeriodList>
      {pomodoro.periods.map((p, i) => (
        <PeriodListItem key={p.title + i}>
          <PeriodCard
            active={pomodoro.state.period === i}
            time={getHumanReadableDuration(p.duration)}
            onClick={() => {
              if (pomodoro.state.period !== i) {
                pomodoro.setPeriod(i);
              }
            }}
          >
            {p.title}
          </PeriodCard>
        </PeriodListItem>
      ))}
    </PeriodList>
  );
};
