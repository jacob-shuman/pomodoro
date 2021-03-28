import { AudioKit, AudioKitAsset } from "@models/audio";

export const getAudioAssetPath = ({ name, extension }: AudioKitAsset) =>
  `./audio/${name}.${extension}`;

export const buildAudioKit = (kit: AudioKit) =>
  Object.entries(kit).reduce(
    (p, [k, v]) => ({ ...p, [k]: getAudioAssetPath(v) }),
    {}
  );
