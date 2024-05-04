import CalenderEvent from "@/Components/Pagecomponents/User/ClassTimeTable/CalenderEvent";
import React from "react";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = async ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;

  let TeacherRoutine;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/teacher-timetable/205`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    if (responseData.code === 200) {
      TeacherRoutine = responseData?.data;
    } else {
      TeacherRoutine = [];
    }
  } catch (error) {
    TeacherRoutine = [];
  }
  return (
    <div>
      <CalenderEvent TeacherRoutine={TeacherRoutine}/>
    </div>
  );
};
export default withAuth(MyServerComponent);
