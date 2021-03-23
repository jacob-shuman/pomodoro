import React from "react";
import { tw } from "twind";

// export interface ButtonProps
//   extends React.ClassAttributes<HTMLButtonElement>,
//     React.ButtonHTMLAttributes<HTMLButtonElement> {
//   active?: boolean;
// }

export interface ButtonProps
  extends React.ClassAttributes<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ active, children }) => {
  return (
    <button
      className={tw(
        active ? "bg-tomato-bright" : "bg-transparent",
        "text-tomato-light px-16 py-2 rounded-xl font-raleway font-semibold"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
