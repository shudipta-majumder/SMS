import React from "react";
import { cookies } from "next/headers";
import Search from "./Search";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../app/api/auth/[...nextauth]/route";

//fetching Role api
const roleApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/role/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const RoleFetchingData = await res.json();
  return RoleFetchingData;
};

const DataWithSteper = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;
  try {
    const roleData = await roleApiName(accessToken);

    return (
      <div>
        <Search roleData={roleData.data} accessToken={accessToken}/>
      </div>
    );
  } catch (error) {
    console.error("Error in DataWithSteper:", error.message);
  }
};

export default DataWithSteper;
