export interface AudioKitAsset {
  name: string;
  extension: string;
}

export interface AudioKit {
  play: AudioKitAsset;
  pause: AudioKitAsset;
}
