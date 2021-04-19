import { tw } from "twind";
import { usePomodoro, useTheme } from "@hooks";
import { getHumanReadableDuration } from "@utils/timer";
import { Button, Icon, List } from "@components";
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";
import humanId from "human-id";

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
    React.HTMLAttributes<HTMLUListElement> {
  editable?: boolean;
}

export const PeriodList: React.FC<PeriodListProps> = ({
  editable,
  children,
  className,
  ...props
}) => {
  const component = (provided?: DroppableProvided) => (
    <ul
      className={tw(
        className,
        tw`flex flex-col items-center w-full p-4 space-y-4 overflow-y-auto`
      )}
      ref={provided?.innerRef ?? undefined}
      {...props}
      {...provided?.droppableProps}
    >
      {children}
      {provided?.placeholder}
    </ul>
  );

  return editable ? (
    <Droppable droppableId={humanId()}>{component}</Droppable>
  ) : (
    component()
  );
};

export interface PeriodListItemProps
  extends React.ClassAttributes<HTMLLIElement>,
    React.HTMLAttributes<HTMLLIElement> {
  index: number;
  editable?: boolean;
  children: (provided: DraggableProvided) => React.ReactNode;
}

export const PeriodListItem: React.FC<PeriodListItemProps> = ({
  index,
  editable,
  children,
  ...props
}) => {
  const component = (provided?: DraggableProvided) => (
    <li
      className={tw(props.className, tw`list-none`)}
      ref={provided?.innerRef ?? undefined}
      {...props}
    >
      {children(provided)}
    </li>
  );

  return editable ? (
    <Draggable draggableId={humanId()} index={index}>
      {component}
    </Draggable>
  ) : (
    component()
  );
};

export interface PeriodQueueProps {
  editable?: boolean; // Should Draggable/Droppable be rendered
}

export const PeriodQueue: React.FC<PeriodQueueProps> = ({ editable }) => {
  const pomodoro = usePomodoro();
  const { styles } = useTheme();

  return (
    <PeriodList editable={editable}>
      {pomodoro.periods.map((p, i) => (
        <PeriodListItem key={p.title + i} index={i} editable={editable}>
          {(provided) => (
            <div
              className="flex items-center space-x-8"
              ref={provided?.innerRef}
              {...provided?.draggableProps}
            >
              {editable && (
                <>
                  <Button.Normal
                    {...provided?.dragHandleProps}
                    disabled={pomodoro.isRunning || pomodoro.periods.length < 2}
                    aria-label={"Move Period"}
                    icon
                  >
                    <Icon name="move" />
                  </Button.Normal>

                  <Button.Normal
                    aria-label={"Delete Period"}
                    icon
                    disabled={pomodoro.periods.length < 2}
                    onClick={() => pomodoro.removePeriod(i)}
                  >
                    <Icon name="delete" />
                  </Button.Normal>
                </>
              )}

              <PeriodCard
                active={!editable && pomodoro.state.period === i}
                time={getHumanReadableDuration(p.duration)}
                onClick={() => {
                  if (!editable && pomodoro.state.period !== i) {
                    pomodoro.setPeriod(i);
                  }
                }}
              >
                {p.title}
              </PeriodCard>
            </div>
          )}
        </PeriodListItem>
      ))}

      {editable && (
        <div
          className={tw`flex flex-col items-center justify-center h-full space-y-4`}
        >
          <Button.Row>
            <Button.Normal
              active
              onClick={() =>
                pomodoro.addPeriod({
                  title: "Focus",
                  duration: { hours: 0, minutes: 30, seconds: 0 },
                })
              }
            >
              <Icon name="add" />

              <p className={tw(styles.font.title)}>Add Focus Period</p>
            </Button.Normal>

            <Button.Normal
              active
              onClick={() =>
                pomodoro.addPeriod({
                  title: "Short Break",
                  duration: { hours: 0, minutes: 5, seconds: 0 },
                })
              }
            >
              <Icon name="add" />

              <p className={tw(styles.font.title)}>Add Short Break</p>
            </Button.Normal>

            <Button.Normal
              active
              onClick={() =>
                pomodoro.addPeriod({
                  title: "Long Break",
                  duration: { hours: 0, minutes: 15, seconds: 0 },
                })
              }
            >
              <Icon name="add" />

              <p className={tw(styles.font.title)}>Add Long Break</p>
            </Button.Normal>
          </Button.Row>

          <Button.Row>
            <Button.Normal active onClick={pomodoro.resetPeriods}>
              <Icon name="reset" />

              <p className={tw(styles.font.title)}>Reset Periods</p>
            </Button.Normal>
          </Button.Row>
        </div>
      )}
    </PeriodList>
  );
};
