export enum BackgroundThemeImage {
  solid = "solid",
  tic_tac_toe = "tic_tac_toe",
  overlapping_circles = "overlapping_circles",
  random = "random",
}

export interface ThemeStyles {
  ring: string;
  outline: {
    base: string;
    hover: string;
    focus: string;
  };
  rounded: {
    all: string;
    top: string;
  };
  transition: string;
  transform: string;
  hover: string;
  focus: string;
  font: {
    title: string;
    body: string;
  };
}

export interface ThemeColor {
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  100: string;
}

export interface ThemeValueState {
  hover: string;
  focus: string;
  pressed: string;
  active: string;
}

export interface TimerTheme {
  title: string;
  duration: string;
}

export interface RingTheme {
  hover: string;
  focus: string;
}

export interface ButtonTheme {
  text: ThemeValueState & { idle: string };
  background: ThemeValueState;
}

export interface BackgroundTheme {
  color: string;
  image: BackgroundThemeImage;
  blurAngle: number;
}

export interface Theme {
  title: string;
  highlight: string;
  timer: TimerTheme;
  ring: RingTheme;
  button: ButtonTheme;
  progress: string;
  background: BackgroundTheme;
}
