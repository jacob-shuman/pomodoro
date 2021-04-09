import { DefaultTheme } from "@constants/theme";
import { BackgroundThemeImage, Theme, ThemeColor } from "@models/theme";

// HEX2RGB (renamed to getRgb) function created by comficker - https://gist.github.com/comficker/871d378c535854c1c460f7867a191a5a#file-hex2rgb-js
export function getRgb(hex: string) {
  if (hex.charAt(0) === "#") {
    hex = hex.substr(1);
  }
  if (hex.length < 2 || hex.length > 6) {
    return false;
  }
  let values = hex.split(""),
    r,
    g,
    b;

  if (hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = r;
    b = r;
  } else if (hex.length === 3) {
    r = parseInt(values[0].toString() + values[0].toString(), 16);
    g = parseInt(values[1].toString() + values[1].toString(), 16);
    b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = parseInt(values[2].toString() + values[3].toString(), 16);
    b = parseInt(values[4].toString() + values[5].toString(), 16);
  } else {
    return false;
  }
  return `${r}, ${g}, ${b}`;
}

export const generateTheme = (title: string, colors: ThemeColor): Theme => ({
  title,
  highlight: colors[20],
  ring: {
    hover: colors[20],
    focus: colors[30],
  },
  button: {
    text: {
      idle: colors[80],
      focus: colors[80],
      hover: colors[80],
      pressed: colors[90],
      active: colors[100],
    },
    background: {
      hover: "transparent",
      focus: "transparent",
      pressed: colors[30],
      active: colors[40],
    },
  },
  progress: colors[50],
  background: {
    color: colors[10],
    image: BackgroundThemeImage.random,
    blurAngle: 140,
  },
});

export const buildTheme = (theme: Theme = DefaultTheme): Theme => ({
  ...DefaultTheme,
  ...theme,
});

export function getBackgroundThemeImageName(image: BackgroundThemeImage) {
  switch (image) {
    case BackgroundThemeImage.solid:
      return "Solid";
    case BackgroundThemeImage.tic_tac_toe:
      return "Tic Tac Toe";
    case BackgroundThemeImage.overlapping_circles:
      return "Overlapping Circles";
    default:
      return "Random";
  }
}

export function getBackgroundThemeImage(image: BackgroundThemeImage) {
  switch (image) {
    case BackgroundThemeImage.solid:
      return "transparent";
    case BackgroundThemeImage.tic_tac_toe:
      return `url("data:image/svg+xml,%3Csvg width='128' height='128' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23ffffff' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E")`;
    case BackgroundThemeImage.overlapping_circles:
      return `url("data:image/svg+xml,%3Csvg width='128' height='128' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
    default:
      return getBackgroundThemeImage(
        BackgroundThemeImage[
          Object.keys(BackgroundThemeImage)[
            Math.floor(
              Math.random() * (Object.keys(BackgroundThemeImage).length - 1)
            )
          ]
        ]
      );
  }
}
