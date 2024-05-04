import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FeesEntryGrid from "./FeesEntryGrid";

const FeesEntryCreatePage = async ({ searchPharams }) => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;
  const ID = searchPharams?.searchParams?.id;

  //fetching specific fees entry details api
  const feesEntryDetailsApi = async (accessToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-entry/detail/${ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );
    const feesEntryDataResponse = await res.json();
    return feesEntryDataResponse;
  };
  //fetching specific fees entry details api
  const feesTypeListApi = async (accessToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-type/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const feesTypeDataResponse = await res.json();
    return feesTypeDataResponse;
  };

  const feesEntryData = await feesEntryDetailsApi(accessToken);
  const feesTypeData = await feesTypeListApi(accessToken);
  return (
    <>
      <FeesEntryGrid
        feesEntryData={feesEntryData}
        feesTypeData={feesTypeData}
        accessToken={accessToken}
        ID={ID}
      />
    </>
  );
};

export default FeesEntryCreatePage;
