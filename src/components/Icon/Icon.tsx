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
} from "react-icons/io5";
import { tw } from "twind";

export interface IconProps extends IconBaseProps {
  name:
    | "skip"
    | "play"
    | "pause"
    | "rewind"
    | "help"
    | "copy"
    | "github"
    | "music"
    | "person";
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const additionalProps = tw(tw`w-10 h-10 mx-auto`);

  switch (name) {
    case "skip":
      return <IoPlaySkipForward {...props} className={additionalProps} />;
    case "play":
      return <IoPlay {...props} className={additionalProps} />;
    case "pause":
      return <IoPause {...props} className={additionalProps} />;
    case "rewind":
      return <IoPlaySkipBack {...props} className={additionalProps} />;
    case "help":
      return <IoHelpCircle {...props} className={additionalProps} />;
    case "copy":
      return <IoCopy {...props} className={additionalProps} />;
    case "github":
      return <IoLogoGithub {...props} className={additionalProps} />;
    case "music":
      return <IoMusicalNote {...props} className={additionalProps} />;
    case "person":
      return <IoPerson {...props} className={additionalProps} />;
  }
};

export default Icon;
