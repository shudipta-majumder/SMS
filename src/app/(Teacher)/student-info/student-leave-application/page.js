import StudentLeaveApplicationTable from "@/Components/Pagecomponents/Teacher/StudentInfo/StudentLeaveApplication/StudentLeaveApplicationTable";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

//class Teacher wise Student search api
const classTeacherWiseStudentApi = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/student/api/teacher-wise`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const classTeacherWiseStudentData = await res.json();
  return classTeacherWiseStudentData;
};

const StudentLeaveApplicationPage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.data?.token?.access;

  const classTeacherWiseStudent = await classTeacherWiseStudentApi(accessToken);
  return (
    <div>
      <StudentLeaveApplicationTable
        session={session}
        accessToken={accessToken}
        classTeacherWiseStudent={classTeacherWiseStudent}
      />
    </div>
  );
};

export default StudentLeaveApplicationPage;
