import { tw } from "twind";
import { Button, Title, Icon } from "@components";
import { useTheme } from "@hooks";
import { Themes } from "@constants/theme";
import { BackgroundThemeImage } from "@models/theme";
import { getBackgroundThemeImageName } from "@utils/theme";

export const ThemeTab: React.FC = () => {
  const { theme, setTheme, randomizeTheme } = useTheme();

  return (
    <div
      className={tw`flex flex-col items-center justify-center h-full space-y-24`}
    >
      <div className={tw`flex flex-col space-y-8`}>
        <div className={tw`flex items-center space-x-4`}>
          <Title>Themes</Title>
          <Button.Normal icon onClick={randomizeTheme}>
            <Icon name="random" />
          </Button.Normal>
        </div>

        <Button.Row className={tw`flex-col space-x-0 space-y-4`}>
          {Object.values(Themes).map((t) => (
            <Button.Normal
              active={theme.title === t.title}
              onClick={() => setTheme(t)}
            >
              {t.title}
            </Button.Normal>
          ))}
        </Button.Row>
      </div>

      <div className={tw`flex flex-col space-y-8`}>
        <div className={tw`flex items-center space-x-4`}>
          <Title>Background</Title>
          <Button.Normal
            icon
            onClick={() =>
              setTheme({
                ...theme,
                background: {
                  ...theme.background,
                  image: BackgroundThemeImage.random,
                },
              })
            }
          >
            <Icon name="random" />
          </Button.Normal>
        </div>

        <Button.Row className={tw`flex-col space-x-0 space-y-4`}>
          {Object.values(BackgroundThemeImage)
            .filter((i) => i !== BackgroundThemeImage.random)
            .map((image) => (
              <Button.Normal
                onClick={() =>
                  setTheme({
                    ...theme,
                    background: {
                      ...theme.background,
                      image,
                    },
                  })
                }
              >
                {getBackgroundThemeImageName(image)}
              </Button.Normal>
            ))}
        </Button.Row>
      </div>
    </div>
  );
};

export default ThemeTab;
