import { ThemeTab, TimerTab, PeriodsTab, AboutTab } from "@components";
import { useTabs } from "@hooks";

const HomePage: React.FC = () => {
  const { tab } = useTabs();

  switch (tab) {
    case "theme":
      return <ThemeTab />;
    case "timer":
      return <TimerTab />;
    case "periods":
      return <PeriodsTab />;
    default:
      return <AboutTab />;
  }
};

export const getStaticProps = async () => ({
  props: {
    app: {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
    },
  },
});

export default HomePage;
