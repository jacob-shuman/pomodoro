import useSettings from "./useSettings";

export function useAudio() {
  const settings = useSettings();

  const play = (path: string) => {
    if (!settings.muteAudio) {
      const audio = new Audio(path);

      audio.oncanplaythrough = () => {
        audio.play();
      };
    }
  };

  const mute = () => settings.setMuteAudio(true);
  const unmute = () => settings.setMuteAudio(false);
  const toggleMute = () => settings.setMuteAudio(!settings.muteAudio);

  return { play, isMuted: settings.muteAudio, mute, unmute, toggleMute };
}

export default useAudio;
