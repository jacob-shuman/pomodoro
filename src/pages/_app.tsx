import withTwindApp from "@twind/next/app";
import twindConfig from "../../twind.config";
import { PageBackground } from "@components";
import { SettingsProvider } from "@hooks";
import "react-circular-progressbar/dist/styles.css";
import React from "react";
import { TabsProvider } from "@hooks/useTabs/useTabs";

function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <TabsProvider>
        <PageBackground>
          <Component {...pageProps} />
        </PageBackground>
      </TabsProvider>
    </SettingsProvider>
  );
}

export default withTwindApp(twindConfig, App);
