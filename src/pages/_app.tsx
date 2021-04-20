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
  usePomodoro,
  useTheme,
} from "@hooks";
import "react-circular-progressbar/dist/styles.css";
import { getHumanReadableDuration } from "@utils/timer";

const PomodoroWrapper: React.FC = ({ children }) => {
  const audio = useAudio();
  const { setTheme } = useTheme();
  const { period } = usePomodoro();

  return (
    <PomodoroProvider
      onStart={() => audio.play(audio.kit.play)}
      onPause={() => audio.play(audio.kit.pause)}
      afterPeriodChange={() => {
        if (period.theme) {
          setTheme(period.theme);
        }
      }}
    >
      {children}
    </PomodoroProvider>
  );
};

const AppWrapper: React.FC = ({ children }) => {
  const pomodoro = usePomodoro();

  return (
    <>
      <NextHead>
        <title>
          {pomodoro.period.title} &bull;{" "}
          {getHumanReadableDuration(
            pomodoro.period.remaining ?? pomodoro.period.duration
          )}
        </title>
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
