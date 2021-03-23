import { tw } from "twind";
import Button from "../components/Button/Button";

export default function Home() {
  return (
    <>
      <button className={tw("text-red-500")}>test</button>
      <Button active>Active</Button>
      <Button>Inactive</Button>
    </>
  );
}
