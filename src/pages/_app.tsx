import React from "react";
import withTwindApp from "@twind/next/app";
import twindConfig from "../../twind.config";
import { Nav, PageBackground } from "@components";
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
  <SettingsProvider>
    <PomodoroWrapper>
      <Nav />

      <PageBackground>
        <Component {...pageProps} />
      </PageBackground>
    </PomodoroWrapper>
  </SettingsProvider>
);

export default withTwindApp(twindConfig, App);
