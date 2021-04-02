import { tw } from "twind";
import { Button, Icon } from "@components";

export const List: React.FC = ({ children }) => (
  <>
    <Button icon>
      <Icon className={tw`animate-pulse`} name="arrow-up" />
    </Button>

    <div className={tw`px-4 py-8 overflow-y-scroll flex flex-col space-y-4`}>
      {children}
    </div>

    <Button icon>
      <Icon className={tw`animate-pulse`} name="arrow-down" />
    </Button>
  </>
);

export default List;
