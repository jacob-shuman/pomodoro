import React from "react";
import NextHead from "next/head";
import withTwindApp from "@twind/next/app";
import twindConfig from "../../twind.config";
import { Footer, Nav, PageBackground } from "@components";
import {
  SettingsProvider,
  TabsProvider,
  PomodoroProvider,
  useAudio,
  useTheme,
  usePomodoro,
} from "@hooks";
import "react-circular-progressbar/dist/styles.css";
import { getHumanReadableDuration } from "@utils/timer";

const PomodoroWrapper: React.FC = ({ children }) => {
  const audio = useAudio();

  return (
    <PomodoroProvider
      onStart={() => audio.play(audio.kit.play)}
      onPause={() => audio.play(audio.kit.pause)}
    >
      {children}
    </PomodoroProvider>
  );
};

const AppWrapper: React.FC = ({ children }) => {
  const pomodoro = usePomodoro();
  const { theme } = useTheme();

  return (
    <>
      <NextHead>
        <title>
          {pomodoro.period.title} &bull;{" "}
          {getHumanReadableDuration(
            pomodoro.period.remaining ?? pomodoro.period.duration
          )}
        </title>

        {/* Next PWA */}
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content={theme.background.color} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content={theme.background.color} />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color={theme.background.color}
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta
          property="og:image"
          content="https://yourdomain.com/icons/apple-touch-icon.png"
        />
      </NextHead>
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => (
  <>
    <SettingsProvider>
      <TabsProvider>
        <PomodoroWrapper>
          <AppWrapper>
            <Nav />

            <PageBackground>
              <Component {...pageProps} />
            </PageBackground>

            <Footer app={pageProps.app} />
          </AppWrapper>
        </PomodoroWrapper>
      </TabsProvider>
    </SettingsProvider>
  </>
);

export default withTwindApp(twindConfig, App);
