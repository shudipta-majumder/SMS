import React from "react";
import SingleStudentDetails from "@/Components/Pagecomponents/StudentInformation/StudentDetails/SingleStudentDetails/SingleStudentDetails";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const fetchStudentAdmissionInfo = async (studentId, accessToken) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/student/api/student/detail/${studentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const studentDetails = await response.json();
  return studentDetails;
};

const SingleStudentDetailsPage = async ({ searchParams: { id } }) => {
  const session = await getServerSession(authOptions);

  const accessToken = session?.user?.data?.token?.access;
  // console.log("firstXXXX", accessToken);
  try {
    const detail = await fetchStudentAdmissionInfo(id, accessToken);
    console.log("details", detail);
    return (
      <div>
        <SingleStudentDetails detail={detail} />
      </div>
    );
  } catch (error) {
    console.error("Error in StudnetAdmissionPage:", error.message);
  }
};

export default SingleStudentDetailsPage;
