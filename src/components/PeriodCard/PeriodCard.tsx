import { tw } from "twind";

export interface PeriodCardProps
  extends React.ClassAttributes<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const PeriodCard: React.FC<PeriodCardProps> = ({ active, children }) => {
  return (
    <button
      className={tw(
        active ? "bg-tomato-bright-idle" : "bg-transparent",
        "text-tomato-light-idle px-16 py-2 rounded-xl font-raleway font-semibold focus:outline-none duration-300 ease-in-out transition transform hover:scale-105 active:scale-95 hover:bg-tomato-bright-hover active:bg-tomato-bright-active"
      )}
    >
      {children}
    </button>
  );
};

export default PeriodCard;
