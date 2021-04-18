import { Theme, ThemeColor } from "@models/theme";
import { generateTheme } from "@utils/theme";

export const ThemeColors: { [key: string]: ThemeColor } = {
  pomodoro: {
    50: "#FFEBEC",
    100: "#FFBFC3",
    200: "#FF9299",
    300: "#FF6670",
    400: "#FB3946",
    500: "#D92430",
    600: "#B7131E",
    700: "#950710",
    800: "#730008",
    900: "#510005",
  },
  antho: {
    50: "#EBECFF",
    100: "#BFC3FF",
    200: "#9299FF",
    300: "#6670FF",
    400: "#3946FB",
    500: "#2430D9",
    600: "#131EB7",
    700: "#071095",
    800: "#000873",
    900: "#000551",
  },
  greenBeefsteak: {
    50: "#F2FFEB",
    100: "#D7FFBE",
    200: "#BBFF92",
    300: "#A0FF65",
    400: "#82FB38",
    500: "#68D923",
    600: "#51B713",
    700: "#3C9506",
    800: "#2C7300",
    900: "#1F5100",
  },
  yellowLeaf: {
    50: "#FEFFE5",
    100: "#FDFFB7",
    200: "#FCFF8A",
    300: "#FBFF5C",
    400: "#FBFF2E",
    500: "#F2F600",
    600: "#CACE00",
    700: "#A2A500",
    800: "#7A7C00",
    900: "#525300",
  },
};

export const Themes: { [key: string]: Theme } = {
  pomodoroRed: generateTheme("Pomodoro Red", ThemeColors.pomodoro),
  anthoBlue: generateTheme("Antho Blue", ThemeColors.antho),
  greenBeefsteak: generateTheme("Green Beefsteak", ThemeColors.greenBeefsteak),
  yellowLeaf: generateTheme("Yellow Leaf", ThemeColors.yellowLeaf),
};

export const DefaultTheme = Themes.pomodoroRed;
