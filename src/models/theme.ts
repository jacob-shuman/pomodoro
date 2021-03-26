export enum ThemeBackgroundImage {
  solid = "solid",
  tic_tac_toe = "tic_tac_toe",
  overlapping_circles = "overlapping_circles",
  random = "random",
}

export interface Theme {
  title: string;
  ring: string;
  button: {
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
  };
  progress: string;
  background: {
    color: string;
    image: ThemeBackgroundImage;
  };
}
