export const PomodoroStoragePrefix = "@jacob-shuman/pomodoro-";

export enum PomodoroStorageKeys {
  settings = "settings",
}

export const PomodoroStorage = Object.entries(PomodoroStorageKeys).reduce(
  (p, [k, v]) => ({ ...p, [k]: `${PomodoroStoragePrefix}${v}` }),
  {}
) as { [key in keyof typeof PomodoroStorageKeys]: string };
