import { Theme, ThemeColor, BackgroundThemeImage } from "@models/theme";
import { generateTheme } from "@utils/theme";

export const ThemeColors: { [key: string]: ThemeColor } = {
  pomodoro: {
    10: "#510005",
    20: "#730008",
    30: "#950710",
    40: "#B7131E",
    50: "#D92430",
    60: "#FB3946",
    70: "#FF6670",
    80: "#FF9299",
    90: "#FFBFC3",
    100: "#FFEBEC",
  },
  antho: {
    10: "#000551",
    20: "#000873",
    30: "#071095",
    40: "#131EB7",
    50: "#2430D9",
    60: "#3946FB",
    70: "#6670FF",
    80: "#9299FF",
    90: "#BFC3FF",
    100: "#EBECFF",
  },
  greenBeefsteak: {
    10: "#1F5100",
    20: "#2C7300",
    30: "#3C9506",
    40: "#51B713",
    50: "#68D923",
    60: "#82FB38",
    70: "#A0FF65",
    80: "#BBFF92",
    90: "#D7FFBE",
    100: "#F2FFEB",
  },
  yellowLeaf: {
    10: "#525300",
    20: "#7A7C00",
    30: "#A2A500",
    40: "#CACE00",
    50: "#F2F600",
    60: "#FBFF2E",
    70: "#FBFF5C",
    80: "#FCFF8A",
    90: "#FDFFB7",
    100: "#FEFFE5",
  },
};

export const Themes: { [key: string]: Theme } = {
  pomodoroRed: generateTheme("Pomodoro Red", ThemeColors.pomodoro),
  anthoBlue: generateTheme("Antho Blue", ThemeColors.antho),
  greenBeefsteak: generateTheme("Green Beefsteak", ThemeColors.greenBeefsteak),
  yellowLeaf: generateTheme("Yellow Leaf", ThemeColors.yellowLeaf),
};

export const DefaultTheme = Themes.pomodoroRed;
