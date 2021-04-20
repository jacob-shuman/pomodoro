import { tw } from "twind";
import { ThemeState, useSettings } from "@hooks";
import { Themes } from "@constants/theme";
import { Theme, ThemeStyles } from "@models/theme";

export function useTheme(): {
  theme: ThemeState;
  setTheme: (theme: ThemeState) => void;
  getRandomTheme: () => Theme;
  randomizeTheme: () => void;
  styles: ThemeStyles;
} {
  const { theme: _theme, setTheme } = useSettings();

  const ring = tw`ring(2 offset-2 offset-transparent)`;
  const outline = {
    base: tw`outline-none ${ring}`,
    focus: (theme?: Theme) => tw`ring-[${(theme ?? _theme).ring.focus}]`,
    hover: (theme?: Theme) => tw`ring-[${(theme ?? _theme).ring.hover}]`,
  };

  const getRandomTheme = () => {
    const availableThemes = Object.entries(Themes)
      .filter(([k, v]) => v.title !== _theme.title)
      .map(([k, v]) => k);

    return Themes[
      availableThemes[Math.floor(Math.random() * availableThemes.length)]
    ];
  };

  const randomizeTheme = () => setTheme(getRandomTheme());

  return {
    theme: _theme,

    setTheme,
    getRandomTheme,
    randomizeTheme,

    styles: {
      ring,
      outline,
      rounded: {
        all: tw`rounded-xl`,
        top: tw`rounded-t-xl`,
      },
      transition: tw`motion-safe:(transition duration-300 ease-in-out)`,
      transform: tw`motion-safe:(transform hover:scale-105 active:scale-95)`,
      hover: (theme?: Theme) =>
        tw`hover:(${outline.base} ${outline.hover(theme ?? _theme)})`,
      focus: (theme?: Theme) =>
        tw`focus:(${outline.base} ${outline.focus(theme ?? _theme)})`,
      font: {
        title: tw`font-poppins`,
        body: tw`font-raleway`,
      },
    },
  };
}

export default useTheme;
