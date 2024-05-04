import VersionTable from "../../../../Components/Pagecomponents/Academic/Version/VersionTable";
import BasicStructure from "../../../../Components/Pagecomponents/Academic/Version/BasicStructure";
import { Box } from "@mui/material";
import { VersionProvider } from "../../../../Components/Pagecomponents/Academic/Version/VersionContext";
import { withAuth } from "@/authHoc/withAuth";

const MyServerComponent = ({ session }) => {
  return (
    <Box>
      <VersionProvider>
        <BasicStructure session={session} />
        <VersionTable session={session} />
      </VersionProvider>
    </Box>
  );
};

export default withAuth(MyServerComponent);

// import React from "react";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// const session = await getServerSession(authOptions);
// const accessToken = session?.user?.data?.token?.access;

// // async function getData() {
// //   const res = await fetch(
// //     `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-room`,
// //     {
// //       method: "GET",
// //       // cache: 'no-store',
// //       // revalidate: 3,
// //       next: { revalidate: 3 },
// //       headers: {
// //         Authorization: `Bearer ${accessToken}`,
// //       },
// //     }
// //   );

// //   if (!res.ok) {
// //     throw new Error("Failed to fetch data");
// //   }

// //   return res.json();
// // }

// async function getData() {
//   const res = await fetch("https://dog.ceo/api/breeds/image/random", { next: { revalidate: 10 } });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// export default async function Page() {
//   const data = await getData();
//   console.log("dog t", data);
//   return (
//     <main>
//       <img src={data.message} alt="Image" />
//       {/* <h1>{data.pagination?.count}</h1> */}
//     </main>
//   );
// }
