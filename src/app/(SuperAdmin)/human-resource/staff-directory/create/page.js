import React from "react";
import DataWithSteper from "../../../../../Components/Pagecomponents/HRMS/Staff/DataWithSteper";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <div>
      <DataWithSteper session={session}/>
    </div>
  );
};

export default withAuth(MyServerComponent);
