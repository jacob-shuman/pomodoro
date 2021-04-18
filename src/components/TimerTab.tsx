import { useState } from "react";
import { tw } from "twind";
import { Button, Icon, List, Period, Timer } from "@components";

export const TimerTab: React.FC = () => {
  return (
    <div className={tw`flex items-center justify-center h-full lg:space-x-24`}>
      <List className={tw`items-center hidden lg:flex`}>
        <Period.Queue />
      </List>

      <Timer />
    </div>
  );
};

export default TimerTab;
