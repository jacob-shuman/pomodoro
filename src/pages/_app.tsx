import withTwindApp from "@twind/next/app";
import twindConfig from "../../twind.config";
import { tw, css } from "twind/css";
import { useTheme, ThemeProvider } from "../hooks/useTheme";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";
import { getRgb, getThemeBackgroundImage } from "../utils/theme";

const Layout: React.FC = ({ children }) => {
  const { theme } = useTheme();
  return (
    <main
      className={tw(
        "h-screen",
        css`
          background-color: ${theme.background.color};
          background-image: ${getThemeBackgroundImage(theme.background.image)};
        `
      )}
    >
      <div
        className={tw(
          "h-full",
          css`
        ::-moz-selection {
          background: #f06543;
        }
        ::-webkit-selection {
          background: #f06543;
        }
        ::selection {
          background: #f06543;
        }
        background: rgb(${theme.background.color});
        background: -moz-linear-gradient(
          140deg,
          rgba(${getRgb(theme.background.color)}, 1) 0%,
          rgba(${getRgb(theme.background.color)}, 0.95) 100%
        );
        background: -webkit-linear-gradient(
          140deg,
          rgba(${getRgb(theme.background.color)}, 1) 0%,
          rgba(${getRgb(theme.background.color)}, 0.95) 100%
        );
        background: linear-gradient(
          140deg,
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

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default withTwindApp(twindConfig, App);
