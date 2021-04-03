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
      <Button.Row>
        <Title>Input</Title>

        <p className={tw`text-xl text-white`}>
          {JSON.stringify(audio.kit.play)}
        </p>
      </Button.Row>

      <Button.Row>
        <Title>Result</Title>

        <p className={tw`text-xl text-white`}>
          {JSON.stringify(getAudioAssetPath(audio.kit.play))}
        </p>
      </Button.Row>

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
      <Button.Row>
        <Title>Play Asset</Title>

        <Button icon onClick={() => audio.play(audio.kit.play)}>
          <Icon name="play" />
        </Button>
      </Button.Row>

      <Button.Row>
        <Title>Pause Asset</Title>

        <Button icon onClick={() => audio.play(audio.kit.pause)}>
          <Icon name="play" />
        </Button>
      </Button.Row>

      <p className={tw`text-xl text-white`}>{JSON.stringify(audio.settings)}</p>
    </>
  );
};

export const Mute: Story<AudioKitAsset> = (props) => {
  const audio = useAudio();

  return (
    <Button.Row>
      <Button icon onClick={() => audio.play(audio.kit.play)}>
        <Icon name="play" />
      </Button>

      <Button icon onClick={() => audio.toggleMute()}>
        <Icon name={audio.isMuted ? "mute" : "unmute"} />
      </Button>

      <p className={tw`text-xl text-white`}>{JSON.stringify(audio.settings)}</p>
    </Button.Row>
  );
};
Mute.args = PlayFromPath.args;
