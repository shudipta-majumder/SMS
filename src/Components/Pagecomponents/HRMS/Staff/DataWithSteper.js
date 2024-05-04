import React from "react";
import Steper from "./Steper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../app/api/auth/[...nextauth]/route";

//fetching gender api
const genderApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/gender/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const genderFetchingData = await res.json();
  return genderFetchingData;
};

//fetching MaretialStatus api
const MaretialStatusApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/marital-status/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const MaretialStatusFetchingData = await res.json();
  return MaretialStatusFetchingData;
};

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
//fetching religion api
const religionApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/religion/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const religionFetchingData = await res.json();
  return religionFetchingData;
};

//fetching blood group api
const bloodGroupApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/bloodgroup/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const bloodGroupFetchingData = await res.json();
  return bloodGroupFetchingData;
};

//fetching department api
const departmentApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/staff/api/department/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const departmentFetchingData = await res.json();
  return departmentFetchingData;
};
//fetching designationn api
const designationnApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/staff/api/designation/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const designationnFetchingData = await res.json();
  return designationnFetchingData;
};
const shiftApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/staff/api/shift/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const shiftFetchingData = await res.json();
  return shiftFetchingData;
};
const boardApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/board/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const boardFetchingData = await res.json();
  return boardFetchingData;
};
const contractTypeApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/setup/api/contrac-type/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const contractTypeFetchingData = await res.json();
  return contractTypeFetchingData;
};
const bankApiName = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/hrms/api/bank/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const bankFetchingData = await res.json();
  return bankFetchingData;
};

const DataWithSteper = async (searchPharams) => {
  const editID = searchPharams?.searchPharams?.searchParams?.q;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;

  const editingRowApi = async (accessToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/detail/${editID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }, 
    
    );
    const boardFetchingData = await res.json();
    return boardFetchingData;
  };

  try {
    const genderData = await genderApiName(accessToken);
    const roleData = await roleApiName(accessToken);
    const meritialStatusData = await MaretialStatusApiName(accessToken);
    const religionData = await religionApiName(accessToken);
    const bloodGroupData = await bloodGroupApiName(accessToken);
    const departmentData = await departmentApiName(accessToken);
    const designationData = await designationnApiName(accessToken);
    const ShiftData = await shiftApiName(accessToken);
    const boardData = await boardApiName(accessToken);
    const contractTypeData = await contractTypeApiName(accessToken);
    const bankData = await bankApiName(accessToken);
    const editingRowData = editID ?await  editingRowApi(accessToken) : {};

    return (
      <div>
        <Steper
          genderData={genderData.data}
          roleData={roleData.data}
          meritialStatusData={meritialStatusData.data}
          religionData={religionData.data}
          bloodGroupData={bloodGroupData.data}
          departmentData={departmentData.data}
          designationData={designationData.data}
          shiftData={ShiftData.data}
          boardData={boardData.data}
          contractTypeData={contractTypeData.data}
          bankData={bankData.data}
          editingRowData={editingRowData}
          editID={editID}
          accessToken={accessToken}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in DataWithSteper:", error.message);
  }
};

export default DataWithSteper;
