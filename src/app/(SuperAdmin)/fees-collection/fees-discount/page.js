import FeesDiscountTable from "@/Components/Pagecomponents/FeesCollection/FeesDiscount/FeesDiscountTable";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

export default async function FeesDiscount() {
  const session =  await getServerSession(authOptions);
  return (
    <div>
      <FeesDiscountTable session={session}/>
    </div>
  );
};


