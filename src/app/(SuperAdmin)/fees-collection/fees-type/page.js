import FeesTypeTable from "@/Components/Pagecomponents/FeesCollection/FeesType/FeesTypeTable";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

export default async function feesType() {
  const session =  await getServerSession(authOptions);
  return (
    <div>
      <FeesTypeTable session={session}/>
    </div>
  );
};

