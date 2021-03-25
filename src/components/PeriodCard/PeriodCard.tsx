import { tw } from "twind";

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
}) => {
  return (
    <button
      className={tw(
        active
          ? "bg-tomato-deep-idle text-tomato-light-idle hover:(text-tomato-light-hover bg-tomato-deep-hover) active:(text-tomato-light-active bg-tomato-deep-active)"
          : "bg-transparent text-tomato-medium-idle hover:(text-tomato-medium-hover) active:(text-tomato-medium-active)",
        "px-6 py-4 w-96 rounded-xl text-xl font-poppins font-semibold focus:outline-none duration-300 ease-in-out transition transform hover:scale-105 active:scale-95",
        "focus:(outline-none ring-2 ring-offset-2 ring-offset-transparent ring-tomato-bright-active) hover:(outline-none ring-2 ring-offset-2 ring-offset-transparent ring-tomato-bright-active)"
      )}
    >
      <div className={tw`flex items-center justify-between`}>
        <p>{children}</p>
        <p>{time}</p>
      </div>
    </button>
  );
};

export default PeriodCard;
