import { createContext, useContext, useEffect } from "react";
import { AudioKits } from "@constants/audio";
import { PomodoroStorage } from "@constants/global";
import { Themes } from "@constants/theme";
import { AudioKit } from "@models/audio";
import { Theme } from "@models/theme";
import { buildTheme } from "@utils/theme";
import { useReduction } from "@hooks";

export interface AudioState {
  mute: boolean;
  kit: AudioKit;
}

export interface ThemeState extends Theme {}

export interface Settings {
  audio: AudioState;
  theme: ThemeState;
}

export interface SettingsProviderProps {
  children?: React.ReactNode;
  settings?: Settings;
}

export interface SettingsContextProps extends Settings {
  setSettings: (settings: Settings) => void;

  setAudioState: (state: Partial<AudioState>) => void;
  setAudioKit: (kit: AudioKit) => void;

  setThemeState: (state: Partial<ThemeState>) => void;
  setTheme: (theme: Theme) => void;
}

export const DefaultSettings: Settings = {
  audio: { mute: true, kit: AudioKits.digital },
  theme: { ...Themes.pomodoroRed },
};

const SettingsContext = createContext<SettingsContextProps>({
  ...DefaultSettings,
  setSettings: () => {},

  setAudioState: () => {},
  setAudioKit: () => {},

  setThemeState: () => {},
  setTheme: () => {},
});

export const useSettings = () => useContext(SettingsContext);

const getValidSettings = (settings?: Settings): Settings => {
  if (!settings) {
    return DefaultSettings;
  }

  return { ...DefaultSettings, ...settings };
};

export function SettingsProvider({
  children,
  settings = DefaultSettings,
}: SettingsProviderProps) {
  const [settingsState, setSettingsState] = useReduction<Settings>(settings);

  const setSettings = (settings: Partial<Settings>) => {
    // TODO: Re-enable this once settings are setup
    // window.localStorage.setItem(
    //   LOCAL_STORAGE.THEME,
    //   JSON.stringify(_buildThemeState(themeState.theme))
    // );

    setSettingsState(settings);
  };

  const setAudioState = (state: Partial<AudioState>) => {
    setSettings({
      audio: {
        ...settingsState.audio,
        ...state,
      },
    });
  };

  const setAudioKit = (kit: AudioKit) => {
    setSettings({
      audio: {
        ...settingsState.audio,
        kit: { ...settingsState.audio.kit, ...kit },
      },
    });
  };

  const setThemeState = (state: Partial<ThemeState>) => {
    setSettings({
      theme: {
        ...settingsState.theme,
        ...state,
      },
    });
  };

  const setTheme = (theme: Theme) => {
    setSettings({
      theme: {
        ...settingsState.theme,
        ...buildTheme(theme),
      },
    });
  };

  useEffect(() => {
    const savedSettings = window.localStorage.getItem(PomodoroStorage.settings);

    setSettingsState(getValidSettings(JSON.parse(savedSettings)));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...settingsState,
        setSettings,

        setAudioState,
        setAudioKit,

        setThemeState,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default useSettings;
