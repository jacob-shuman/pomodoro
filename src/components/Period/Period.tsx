import { tw } from "twind";
import { usePomodoro } from "@hooks";
import { getHumanReadableDuration } from "@utils/timer";
import { Button, Icon } from "@components";

export interface PeriodCardProps
  extends React.ClassAttributes<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  time?: string;
}

export const PeriodCard: React.FC<PeriodCardProps> = ({
  className,
  children,
  time,
  ...props
}) => {
  return (
    <Button.Normal
      {...props}
      className={tw(
        className,
        `flex items-center justify-between font-poppins text-xl font-semibold space-x-24 px-8 py-4 w-96`
      )}
    >
      <p>{children}</p>
      <p>{time}</p>
    </Button.Normal>
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
      tw`flex flex-col items-center w-full p-4 space-y-4 overflow-y-auto`
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

export interface PeriodQueueProps {
  editing: boolean;
}

export const PeriodQueue: React.FC<PeriodQueueProps> = ({ editing }) => {
  const pomodoro = usePomodoro();

  return (
    <PeriodList>
      {pomodoro.periods.map((p, i) => (
        <PeriodListItem key={p.title + i}>
          <div className="flex items-center space-x-8">
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

            {editing && (
              <Button.Normal
                aria-label={"Delete Period"}
                icon
                disabled={pomodoro.periods.length < 2}
                onClick={() => pomodoro.removePeriod(i)}
              >
                <Icon name="delete" />
              </Button.Normal>
            )}
          </div>
        </PeriodListItem>
      ))}
    </PeriodList>
  );
};
