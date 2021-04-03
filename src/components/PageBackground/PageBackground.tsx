import { tw, css } from "twind/css";
import { useTheme } from "@hooks";
import { getRgb, getBackgroundThemeImage } from "@utils/theme";

export const PageBackground: React.FC = ({ children }) => {
  const { theme } = useTheme();

  return (
    <>
      {/* TODO: background-image is causing a client/server mismatch */}
      <main
        className={tw(
          tw`absolute z-10 h-full w-full bg-repeat`,
          css`
            background-color: ${theme.background.color};
            background-image: ${getBackgroundThemeImage(
              theme.background.image
            )};
          `
        )}
      >
        <div
          className={tw(
            "h-full w-full fixed top-0 left-0",
            css`
           ::-moz-selection {
             background: ${theme.highlight};
           }
           ::-webkit-selection {
             background: ${theme.highlight};
           }
           ::selection {
             background: ${theme.highlight};
           }
           background: rgb(${theme.background.color});
           background: -moz-linear-gradient(
             ${theme.background.blurAngle}deg,
             rgba(${getRgb(theme.background.color)}, 1) 0%,
             rgba(${getRgb(theme.background.color)}, 0.95) 100%
           );
           background: -webkit-linear-gradient(
             ${theme.background.blurAngle}deg,
             rgba(${getRgb(theme.background.color)}, 1) 0%,
             rgba(${getRgb(theme.background.color)}, 0.95) 100%
           );
           background: linear-gradient(
             ${theme.background.blurAngle}deg,
             rgba(${getRgb(theme.background.color)}, 1) 0%,
             rgba(${getRgb(theme.background.color)}, 0.95) 100%
           );
           filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="${getRgb(
             theme.background.color
           )}",endColorstr="${getRgb(theme.background.color)}",GradientType=1);
         `
          )}
        ></div>
        <div
          className={tw`fixed top-0 left-0 w-screen h-screen overflow-y-scroll`}
        >
          {children}
        </div>
      </main>
    </>
  );
};
