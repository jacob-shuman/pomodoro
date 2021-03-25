import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return <></>;
};

export default NotFoundPage;
