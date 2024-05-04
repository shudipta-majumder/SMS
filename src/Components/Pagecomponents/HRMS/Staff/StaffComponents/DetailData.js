import DetailPage from "./DetailPage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../app/api/auth/[...nextauth]/route";
const DetailData = async (searchPharams) => {
  const editID = searchPharams?.searchPharams?.searchParams?.q;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;

  const DetailAPI = async (accessToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/detail/${editID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );
    const boardFetchingData = await res.json();
    return boardFetchingData;
  };

  try {
    const SingleStaffData = await DetailAPI(accessToken);
    return <DetailPage SingleStaffData={SingleStaffData} editID={editID} />;
  } catch (error) {
    console.error("Error in DetailPage:", error.message);
  }
};

export default DetailData;
