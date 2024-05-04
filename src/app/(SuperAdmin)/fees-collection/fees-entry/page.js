import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import FeesEntryTable from "@/Components/Pagecomponents/FeesCollection/FeesEntry/FeesEntryTable";

const FeesEntryPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <FeesEntryTable session={session} />
    </div>
  );
};

export default FeesEntryPage;
