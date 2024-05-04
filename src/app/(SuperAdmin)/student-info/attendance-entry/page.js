import Data from "./Data";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  return (
    <div>
      <Data accessToken={accessToken} />
    </div>
  );
};

export default withAuth(MyServerComponent);
