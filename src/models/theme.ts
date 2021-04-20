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
    hover: (theme?: Theme) => string;
    focus: (theme?: Theme) => string;
  };
  rounded: {
    all: string;
    top: string;
  };
  transition: string;
  transform: string;
  hover: (theme?: Theme) => string;
  focus: (theme?: Theme) => string;
  font: {
    title: string;
    body: string;
  };
}

export interface ThemeColor {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeValueState {
  hover: string;
  focus: string;
  pressed: string;
  active: string;
  disabled: string;
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
