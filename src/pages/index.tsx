import { tw } from "twind";
import {} from "@headlessui/react";
import { List, Period, Timer } from "@components";

const HomePage: React.FC = () => {
  return (
    <div className={tw`flex items-center justify-center h-full lg:space-x-24`}>
      <List className={tw`hidden lg:flex`}>
        <Period.Queue />
      </List>

      <Timer />
    </div>
  );
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
