export const feesTypeListApi = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-type/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchExamNamesList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/exam/api/exam-name/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchVerssionList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/version/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchSessionList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/session/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchSectionList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/section/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchSubjectList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/subject/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchClassList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchClassRoomList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-room/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchClassPeriodList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-period/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchClassSectionList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-section/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchClassSubjectList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-subject/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchDepartmentList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/department/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchDesignationList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/designation/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchStaffList = async (accessToken) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/staff/api/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchTeacherList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/teacher/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchShiftList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/shift/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchStaffLeaveBalanceList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/leave/balance/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchEduBoardList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/board/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchDistrictList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/district/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchCountryList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/country/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchThanaList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/thana/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchDivisionList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/division/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchReligionList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/religion/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchBloodGroupList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/bloodgroup/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchGenderList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/gender/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchOccupationList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/occupation/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchRelationList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/relation/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchFloorList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/floor/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchSubjectTypeList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/subject-type/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchContracTypeList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/contrac-type/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchRoleList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/role/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchMaritalStatusList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/marital-status/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchBankList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/hrms/api/bank/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchLeaveTypeList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/hrms/api/leave-type/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchGroupList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/academic/api/group/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchStudentLeaveList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/student/api/leave/list `,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchAllStudentsByAssignedClassTeacherList = async (
  accessToken
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/student/api/teacher-wise`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchHolidayList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/hrms/api/holiday/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};

export const fetchStudentAttendanceTypeList = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/setup/api/attendance-typee/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseData = await res.json();

    if (responseData?.code === 200) {
      return responseData?.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching exam names:", error);
    return [];
  }
};
