import { Theme, ThemeBackgroundImage } from "../models/theme";

export const ThemeColor = {
  tomato: {
    light: {
      active: "#bfbbb1",
      hover: "#e6e0d4",
      idle: "#FFF9EC",
    },
    medium: {
      active: "#bd857d",
      hover: "#e39f95",
      idle: "#FCB1A6",
    },
    bright: {
      active: "#a31b24",
      hover: "#c3202b",
      idle: "#D92430",
    },
    deep: {
      active: "#6e121a",
      hover: "#83161f",
      idle: "#921822",
    },
    dark: {
      active: "#4b0a0f",
      hover: "#5a0c12",
      idle: "#640D14",
    },
  },
  peach: {
    active: "#b44c32",
    hover: "#d85b3c",
    idle: "#f06543",
  },
};

export const DEFAULT_THEME: { [key: string]: Theme } = {
  POMODORO_RED: {
    title: "Pomodoro Red",
    ring: ThemeColor.tomato.bright.active,
    button: {
      text: {
        active: ThemeColor.tomato.light.hover,
        hover: ThemeColor.tomato.light.hover,
        inactive: ThemeColor.tomato.medium.idle,
      },
      background: {
        idle: ThemeColor.tomato.bright.idle,
        hover: ThemeColor.tomato.deep.hover,
        active: ThemeColor.tomato.bright.active,
      },
    },
    progress: ThemeColor.tomato.bright.idle,
    background: {
      color: ThemeColor.tomato.dark.idle,
      image: ThemeBackgroundImage.random,
    },
  },
  ANTHO_BLUE: {
    title: "Antho Blue",
    ring: "#2430D9",
    button: {
      text: {
        active: ThemeColor.tomato.light.hover,
        hover: ThemeColor.tomato.light.hover,
        inactive: ThemeColor.tomato.light.idle,
      },
      background: {
        idle: "#111766",
        hover: "#1F29BC",
        active: "#2529AC",
      },
    },
    progress: "#2430D9",
    background: {
      color: "#111766",
      image: ThemeBackgroundImage.random,
    },
  },
};
