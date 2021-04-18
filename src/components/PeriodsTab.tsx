import { tw } from "twind";
import { List, Period } from "@components";
import { DragDropContext } from "react-beautiful-dnd";
import { usePomodoro } from "@hooks";

export const PeriodsTab: React.FC = () => {
  const pomodoro = usePomodoro();

  return (
    <div className={tw`flex items-center justify-center h-full lg:space-x-24`}>
      <DragDropContext
        enableDefaultSensors={!pomodoro.isRunning}
        onDragEnd={({ destination, source }) => {
          if (
            destination &&
            (destination.droppableId !== source.droppableId ||
              destination.index !== source.index)
          ) {
            pomodoro.movePeriod(source.index, destination.index);
          }
        }}
      >
        <List className={tw`items-center flex`}>
          <Period.Queue editable />
        </List>
      </DragDropContext>
    </div>
  );
};

export default PeriodsTab;
