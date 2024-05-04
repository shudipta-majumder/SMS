import React from "react";
import Search from "./Search";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../app/api/auth/[...nextauth]/route";

//fetching Role api
const LeaveType = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/staff/api/leave-type/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const AllLeaveTYpeData = await res.json();
  return AllLeaveTYpeData;
};

//fetching Empolyee api
const Employee = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/staff/api/role-base-staff/0`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const AllEmployeeData = await res.json();
  return AllEmployeeData;
};

const APIFetch = async (searchPharams) => {
  const editID = searchPharams?.searchPharams?.searchParams?.q;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;
  const UserName = session?.user?.data?.username;
  const FirstName = session?.user?.data?.first_name;
  const LastName = session?.user?.data?.last_name;
  const EmployeeName = `${UserName} - ${FirstName} ${LastName}`;

  const editingRowApi = async (accessToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/leave-trns/detail/${editID}`,
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

  try {
    const LeaveTypeData = await LeaveType(accessToken);
    const EmpolyeeData = await Employee(accessToken);
    const LeaveStatusData = await LeaveStatusAPI(accessToken);
    const editingRowData = editID ? await editingRowApi(accessToken) : {};

    return (
      <div>
        <Search
          LeaveStatusData={LeaveStatusData.data}
          EmployeeName={EmployeeName}
          EmpolyeeData={EmpolyeeData.data}
          LeaveTypeData={LeaveTypeData.data}
          editingRowData={editingRowData.data}
          accessToken={accessToken}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in APIFetch:", error.message);
  }
};

export default APIFetch;
