import { tw } from "twind";
import { Story, Meta } from "@storybook/react";
import { useAudio } from "@hooks";
import { getAudioAssetPath } from "@utils/audio";
import { Button, ButtonRow, Icon, Title } from "@components";
import { AudioKits } from "@constants/audio";
import { AudioKitAsset } from "@models/audio";

export default {
  title: "Hooks/useAudio",
} as Meta;

export const AssetPath: Story = () => {
  const audio = useAudio();

  return (
    <>
      <ButtonRow>
        <Title>Input</Title>

        <p className={tw`text-xl text-white`}>
          {JSON.stringify(audio.kit.play)}
        </p>
      </ButtonRow>

      <ButtonRow>
        <Title>Result</Title>

        <p className={tw`text-xl text-white`}>
          {JSON.stringify(getAudioAssetPath(audio.kit.play))}
        </p>
      </ButtonRow>

      <p className={tw`text-xl text-white`}>{JSON.stringify(audio.settings)}</p>
    </>
  );
};

export const PlayFromPath: Story<AudioKitAsset> = (props) => {
  const audio = useAudio();

  return (
    <>
      <Button icon onClick={() => audio.play(props)}>
        <Icon name="play" />
      </Button>
    </>
  );
};
PlayFromPath.args = { ...AudioKits.digital.play };

export const PlayFromKit: Story = () => {
  const audio = useAudio();

  return (
    <>
      <ButtonRow>
        <Title>Play Asset</Title>

        <Button icon onClick={() => audio.play(audio.kit.play)}>
          <Icon name="play" />
        </Button>
      </ButtonRow>

      <ButtonRow>
        <Title>Pause Asset</Title>

        <Button icon onClick={() => audio.play(audio.kit.pause)}>
          <Icon name="play" />
        </Button>
      </ButtonRow>

      <p className={tw`text-xl text-white`}>{JSON.stringify(audio.settings)}</p>
    </>
  );
};

export const Mute: Story<AudioKitAsset> = (props) => {
  const audio = useAudio();

  return (
    <ButtonRow>
      <Button icon onClick={() => audio.play(audio.kit.play)}>
        <Icon name="play" />
      </Button>

      <Button icon onClick={() => audio.toggleMute()}>
        <Icon name={audio.isMuted ? "mute" : "unmute"} />
      </Button>

      <p className={tw`text-xl text-white`}>{JSON.stringify(audio.settings)}</p>
    </ButtonRow>
  );
};
Mute.args = PlayFromPath.args;
