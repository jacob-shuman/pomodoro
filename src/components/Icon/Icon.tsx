import { IconBaseProps } from "react-icons";
import {
  IoPlaySkipForward,
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoHelpCircle,
  IoCopy,
  IoLogoGithub,
  IoMusicalNote,
  IoPerson,
  IoCheckbox,
  IoCheckboxOutline,
  IoVolumeMute,
  IoVolumeHigh,
  IoRepeat,
  IoColorPalette,
  IoTimer,
  IoAlbums,
  IoTrash,
  IoSwapVertical,
  IoAdd,
  IoShuffle,
} from "react-icons/io5";
import { tw } from "twind";

export interface IconProps extends IconBaseProps {
  name:
    | "skip"
    | "play"
    | "pause"
    | "rewind"
    | "about"
    | "copy"
    | "github"
    | "music"
    | "person"
    | "checkbox"
    | "checkbox-outline"
    | "mute"
    | "unmute"
    | "repeat"
    | "palette"
    | "timer"
    | "periods"
    | "delete"
    | "move"
    | "add"
    | "random";

  size?: "small" | "large";
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = "small",
  ...props
}) => {
  const additionalProps = tw(
    props.className,
    tw(size === "large" ? `w-10` : `w-8`, `mx-auto h-full my-auto text-center`)
  );

  switch (name) {
    case "skip":
      return <IoPlaySkipForward {...props} className={additionalProps} />;
    case "play":
      return <IoPlay {...props} className={additionalProps} />;
    case "pause":
      return <IoPause {...props} className={additionalProps} />;
    case "rewind":
      return <IoPlaySkipBack {...props} className={additionalProps} />;
    case "about":
      return <IoHelpCircle {...props} className={additionalProps} />;
    case "copy":
      return <IoCopy {...props} className={additionalProps} />;
    case "github":
      return <IoLogoGithub {...props} className={additionalProps} />;
    case "music":
      return <IoMusicalNote {...props} className={additionalProps} />;
    case "person":
      return <IoPerson {...props} className={additionalProps} />;
    case "checkbox":
      return <IoCheckbox {...props} className={additionalProps} />;
    case "checkbox-outline":
      return <IoCheckboxOutline {...props} className={additionalProps} />;
    case "mute":
      return <IoVolumeMute {...props} className={additionalProps} />;
    case "unmute":
      return <IoVolumeHigh {...props} className={additionalProps} />;
    case "repeat":
      return <IoRepeat {...props} className={additionalProps} />;
    case "palette":
      return <IoColorPalette {...props} className={additionalProps} />;
    case "timer":
      return <IoTimer {...props} className={additionalProps} />;
    case "periods":
      return <IoAlbums {...props} className={additionalProps} />;
    case "delete":
      return <IoTrash {...props} className={additionalProps} />;
    case "move":
      return <IoSwapVertical {...props} className={additionalProps} />;
    case "add":
      return <IoAdd {...props} className={additionalProps} />;
    case "random":
      return <IoShuffle {...props} className={additionalProps} />;
  }
};
