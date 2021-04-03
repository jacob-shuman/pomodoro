export interface ButtonTheme {
  text: {
    active: string;
    hover: string;
    inactive: string;
  };
  background: {
    idle: string;
    hover: string;
    active: string;
  };
}

export interface BackgroundTheme {
  color: string;
  image: BackgroundThemeImage;
  blurAngle: number;
}

export enum BackgroundThemeImage {
  solid = "solid",
  tic_tac_toe = "tic_tac_toe",
  overlapping_circles = "overlapping_circles",
  random = "random",
}

export interface ThemeStyles {
  outline: string;
  rounded: {
    all: string;
    top: string;
  };
  transition: string;
  transform: string;
  focus: string;
  hover: string;
  font: {
    title: string;
    body: string;
  };
}

export interface Theme {
  title: string;
  highlight: string;
  ring: string;
  button: ButtonTheme;
  progress: string;
  background: BackgroundTheme;
}
