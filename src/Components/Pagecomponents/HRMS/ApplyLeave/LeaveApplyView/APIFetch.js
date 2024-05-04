import React from "react";
import Search from "./Search";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../app/api/auth/[...nextauth]/route";

//leave balance list api
const LeaveStatusAPI = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/staff/api/leave/balance/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const LeaveStatusFetchingData = await res.json();
  return LeaveStatusFetchingData;
};

const LeaveStatus = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
  try {
    const LeaveStatusData = await LeaveStatusAPI(accessToken);

    return (
      <div>
        <Search
          LeaveStatusData={LeaveStatusData.data}
          accessToken={accessToken}
          menuData={menuData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in LeaveStatus:", error.message);
  }
};

export default LeaveStatus;
