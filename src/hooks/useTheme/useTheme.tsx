import { tw } from "twind";
import { ThemeState, useSettings } from "@hooks";
import { Themes } from "@constants/theme";
import { ThemeStyles } from "@models/theme";

export function useTheme(): {
  theme: ThemeState;
  setTheme: (theme: ThemeState) => void;
  randomizeTheme: () => void;
  styles: ThemeStyles;
} {
  const { theme, setTheme } = useSettings();

  const outline = tw`outline-none ring(2 offset-2 offset-transparent [${theme.ring}])`;

  return {
    theme,
    setTheme,
    randomizeTheme: () => {
      const availableThemes = Object.entries(Themes)
        .filter(([k, v]) => v.title !== theme.title)
        .map(([k, v]) => k);

      setTheme(
        Themes[
          availableThemes[Math.floor(Math.random() * availableThemes.length)]
        ]
      );
    },

    styles: {
      outline,
      rounded: tw`rounded-xl`,
      transition: tw`motion-safe:(transition duration-300 ease-in-out)`,
      transform: tw`motion-safe:(transform hover:scale-105 active:scale-95)`,
      focus: tw`focus:(${outline})`,
      hover: tw`hover:(${outline})`,
      font: {
        title: tw`font-poppins`,
        body: tw`font-raleway`,
      },
    },
  };
}

export default useTheme;
