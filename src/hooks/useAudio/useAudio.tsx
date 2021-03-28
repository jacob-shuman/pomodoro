import { AudioKitAsset } from "@models/audio";
import { getAudioAssetPath } from "@utils/audio";
import { useSettings } from "@hooks";

export function useAudio() {
  const settings = useSettings();

  const play = (asset: AudioKitAsset) => {
    if (!settings.audio.mute) {
      const audio = new Audio(getAudioAssetPath(asset));

      audio.oncanplaythrough = () => {
        audio.play();
      };
    }
  };

  const mute = () => settings.setAudioState({ mute: true });
  const unmute = () => settings.setAudioState({ mute: false });
  const toggleMute = () =>
    settings.setAudioState({ mute: !settings.audio.mute });

  return {
    settings: settings.audio,
    kit: settings.audio.kit,

    play,

    isMuted: settings.audio.mute,
    mute,
    unmute,
    toggleMute,
  };
}

export default useAudio;
