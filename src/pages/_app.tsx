import withTwindApp from "@twind/next/app";
import twindConfig from "../../twind.config";
import { tw, css } from "twind/css";
import { useTheme, ThemeProvider } from "../hooks/useTheme";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";
import { getRgb } from "../utils/theme";

const Layout: React.FC = ({ children }) => {
  const { theme } = useTheme();
  return (
    <main
      className={tw(
        "h-screen",
        css`
          background-color: ${theme.background.color};
          background-image: url("data:image/svg+xml,%3Csvg width='128' height='128' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23ef8f65' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
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
