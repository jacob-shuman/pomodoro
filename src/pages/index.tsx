import { tw } from "twind";
import { List, Period, Timer } from "@components";

const HomePage: React.FC = () => {
  return (
    <div className={tw`flex items-center justify-center h-full space-x-24`}>
      <List>
        <Period.Queue />
      </List>

      <Timer />
    </div>
  );
};

export default HomePage;
