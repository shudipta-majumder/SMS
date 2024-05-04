import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import StudentLeaveApplyTable from "@/Components/Pagecomponents/User/StudentInfo/StudentLeaveApply/StudentLeaveApplyTable";

const studentApplyLeavePage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;

  return (
    <div>
      <StudentLeaveApplyTable session={session} accessToken={accessToken} />
    </div>
  );
};

export default studentApplyLeavePage;
