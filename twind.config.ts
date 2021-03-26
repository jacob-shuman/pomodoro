import { Configuration } from "twind";
import { ThemeColor } from "./src/constants/theme";

export default {
  theme: {
    extend: {
      colors: ThemeColor,
    },
    fontFamily: {
      poppins: ["Poppins"],
      raleway: ["Raleway"],
    },
  },
} as Configuration;
