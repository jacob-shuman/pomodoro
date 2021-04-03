import { tw } from "twind";

export interface ListProps
  extends React.ClassAttributes<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {}

export const List: React.FC<ListProps> = ({
  children,
  className,
  ...props
}) => (
  //  TODO: Add gradient overlay to scroll container
  //      <div
  //         className={tw(
  //           tw`absolute top-0 left-0 w-full h-full`,
  //           css`
  //             background: rgb(255, 255, 255);
  //             background: -moz-linear-gradient(
  //               180deg,
  //               rgba(255, 255, 255, 0) 0%,
  //               rgba(${getRgb(theme.background.color)}, 0.25) 80%,
  //               rgba(${getRgb(theme.background.color)}, 0.5) 90%,
  //               rgba(${getRgb(theme.background.color)}, 0.95) 100%
  //             );
  //             background: -webkit-linear-gradient(
  //               180deg,
  //               rgba(255, 255, 255, 0) 0%,
  //               rgba(${getRgb(theme.background.color)}, 0.25) 80%,
  //               rgba(${getRgb(theme.background.color)}, 0.5) 90%,
  //               rgba(${getRgb(theme.background.color)}, 0.95) 100%
  //             );
  //             background: linear-gradient(
  //               180deg,
  //               rgba(255, 255, 255, 0) 0%,
  //               rgba(${getRgb(theme.background.color)}, 0.25) 80%,
  //               rgba(${getRgb(theme.background.color)}, 0.5) 90%,
  //               rgba(${getRgb(theme.background.color)}, 0.95) 100%
  //             );
  //             filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ff0000",GradientType=1);
  //           `
  //         )}
  //       ></div>

  <div
    className={tw(
      className,
      tw`flex-col h-full min-w-[25%] max-h-[70%] justify-center`
    )}
    {...props}
  >
    {children}
  </div>
);

export default List;
