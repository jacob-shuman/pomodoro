/** @type {import('twind').Configuration} */
export default {
  theme: {
    extend: {
      colors: {
        tomato: {
          light: {
            active: "#bfbbb1",
            hover: "#e6e0d4",
            idle: "#FFF9EC",
          },
          medium: {
            active: "#bd857d",
            hover: "#e39f95",
            idle: "#FCB1A6",
          },
          bright: {
            active: "#a31b24",
            hover: "#c3202b",
            idle: "#D92430",
          },
          deep: {
            active: "#6e121a",
            hover: "#83161f",
            idle: "#921822",
          },
          dark: {
            active: "#4b0a0f",
            hover: "#5a0c12",
            idle: "#640D14",
          },
        },
      },
    },
    fontFamily: {
      poppins: ["Poppins"],
      raleway: ["Raleway"],
    },
  },
};
