import { tw, css } from "twind/css";
import { useTheme } from "@hooks";
import { getRgb, getBackgroundThemeImage } from "@utils/theme";

export const PageBackground: React.FC = ({ children }) => {
  const { theme } = useTheme();

  return (
    <main
      // TODO: background-image is causing a client/server mismatch
      className={tw(
        tw`h-screen bg-repeat`,
        css`
          background-color: ${theme.background.color};
          background-image: ${getBackgroundThemeImage(theme.background.image)};
        `
      )}
    >
      <div
        className={tw(
          "h-full",
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
      >
        {children}
      </div>
    </main>
  );
};