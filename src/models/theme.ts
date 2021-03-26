export enum THEME_BACKGROUND_IMAGE {
  SOLID = "SOLID",
  TIC_TAC_TOE = "TIC_TAC_TOE",
  RANDOM = "RANDOM",
}

export interface Theme {
  title: string;
  button: {
    text: {
      active: string;
      inactive: string;
    };
  };
  background: {
    image: THEME_BACKGROUND_IMAGE;
  };
}
