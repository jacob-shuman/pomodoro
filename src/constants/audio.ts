import { AudioKit, AudioKitAsset } from "@models/audio";

export const AudioKitAssets: { [key: string]: AudioKitAsset } = {
  pepSound1: { name: "pepSound1", extension: "ogg" },
  pepSound2: { name: "pepSound2", extension: "ogg" },
};

export const AudioKits: { [key: string]: AudioKit } = {
  digital: {
    play: AudioKitAssets.pepSound1,
    pause: AudioKitAssets.pepSound2,
  },
};
