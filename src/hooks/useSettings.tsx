import { useState } from "react";

export function useSettings() {
  const [muteAudio, setMuteAudio] = useState(false);

  return { muteAudio, setMuteAudio };
}

export default useSettings;
