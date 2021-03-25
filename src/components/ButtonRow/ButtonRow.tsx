import { tw } from "twind";

export interface ButtonRowProps
  extends React.ClassAttributes<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {}

export const ButtonRow: React.FC<ButtonRowProps> = ({ children, ...props }) => (
  <div {...props} className={tw`flex items-center space-x-8`}>
    {children}
  </div>
);

export default ButtonRow;
