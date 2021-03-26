export const LOCAL_STORAGE_PREFIX = "@jacob-shuman/pomodoro-";

export enum LOCAL_STORAGE_KEYS {
  THEME = "theme",
}

// @ts-ignore
export const LOCAL_STORAGE: {
  [key in keyof typeof LOCAL_STORAGE_KEYS]: string;
} = (() => {
  const result = {};

  for (let [k, v] of Object.entries(LOCAL_STORAGE_KEYS)) {
    result[k] = `${LOCAL_STORAGE_PREFIX}${v}`;
  }

  return result;
})();

// export const LOCAL_STORAGE: {
//   [key in keyof typeof LOCAL_STORAGE_KEYS]: string;
// } = (() => {
//   // const result = {};

//   // for (let [k, v] of Object.entries(LOCAL_STORAGE_KEYS)) {
//   //   result[k] = `${LOCAL_STORAGE_PREFIX}${v}`;
//   // }

//   return Object.entries(LOCAL_STORAGE_KEYS).reduce(
//     (p, [k, v], i, res) => ({ ...res, [k]: `${LOCAL_STORAGE_PREFIX}${v}` }),
//     {}
//   );
// })();
