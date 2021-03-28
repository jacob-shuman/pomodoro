import { tw } from "twind";
import { useSettings } from "@hooks";

export function useTheme() {
  const { theme, setTheme } = useSettings();

  const outline = tw`outline-none ring(2 offset-2 offset-transparent [${theme.ring}])`;

  return {
    theme,
    setTheme,

    style: {
      outline,
      rounded: tw`rounded-xl`,
      transition: tw`transition duration-300 ease-in-out`,
      transform: tw`transform hover:scale-105 active:scale-95`,
      focus: tw`focus:(${outline})`,
      hover: tw`hover:(${outline})`,
      font: {
        title: tw`font-poppins`,
        body: tw`font-raleway`,
      },
    },
  };
}

export default useTheme;
