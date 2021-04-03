import React from "react";
import NextHead from "next/head";
import withTwindApp from "@twind/next/app";
import twindConfig from "../../twind.config";
import { Footer, Nav, PageBackground } from "@components";
import { SettingsProvider, PomodoroProvider, useAudio } from "@hooks";
import "react-circular-progressbar/dist/styles.css";

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

const App = ({ Component, pageProps }) => (
  <>
    <NextHead>
      <title>Pomodoro</title>
    </NextHead>

    <SettingsProvider>
      <PomodoroWrapper>
        <Nav />

        <PageBackground>
          <Component {...pageProps} />
        </PageBackground>

        <Footer app={pageProps.app} />
      </PomodoroWrapper>
    </SettingsProvider>
  </>
);

export default withTwindApp(twindConfig, App);
