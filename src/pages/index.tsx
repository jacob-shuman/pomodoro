import { tw } from "twind";
import {} from "@headlessui/react";
import { Button, Icon, List, Period, Timer } from "@components";
import { useState } from "react";

const HomePage: React.FC = () => {
  const [editPeriods, setEditPeriods] = useState(false);

  return (
    <div className={tw`flex items-center justify-center h-full lg:space-x-24`}>
      <List className={tw`items-center hidden lg:flex`}>
        <Button.Normal
          aria-label={"Edit Periods"}
          className="self-start"
          active={editPeriods}
          onClick={() => setEditPeriods(!editPeriods)}
        >
          <p>Edit Periods</p>

          <Icon name="periods" />
        </Button.Normal>

        <Period.Queue editing={editPeriods} />
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
