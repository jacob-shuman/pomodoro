import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { LOCAL_STORAGE } from "../constants/global";
import { DEFAULT_THEME } from "../constants/theme";
import { Theme } from "../models/theme";

export interface ThemeState {
  theme: Theme;
}

export interface ThemeProviderProps {
  children?: ReactNode;
  theme?: ThemeState;
}

export interface ThemeContextProps extends ThemeState {
  setTheme: (theme: Theme) => void;
}

export const DEFAULT_THEME_STATE: ThemeState = {
  theme: DEFAULT_THEME.POMODORO_RED,
};

const ThemeContext = createContext<ThemeContextProps>({
  ...DEFAULT_THEME_STATE,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const _buildThemeState = (theme: Theme): ThemeState => ({
  theme: { ...DEFAULT_THEME.POMODORO_RED, ...theme },
});

const _getValidThemeState = (themeState?: ThemeState): ThemeState => {
  if (!themeState) {
    return DEFAULT_THEME_STATE;
  }

  return { ...DEFAULT_THEME_STATE, ...themeState };
};

export function ThemeProvider({
  children,
  theme = DEFAULT_THEME_STATE,
}: ThemeProviderProps) {
  const [_themeState, _setThemeState] = useState(theme);

  const setThemeState = (themeState: ThemeState) => {
    // window.localStorage.setItem(
    //   LOCAL_STORAGE.THEME,
    //   JSON.stringify(_buildThemeState(themeState.theme))
    // );

    _setThemeState(themeState);
  };

  const setTheme = (theme: Theme) => {
    setThemeState(_buildThemeState(theme));
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(LOCAL_STORAGE.THEME);

    setThemeState(_getValidThemeState(JSON.parse(savedTheme)));
  }, []);

  return (
    <ThemeContext.Provider value={{ ..._themeState, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default useTheme;
