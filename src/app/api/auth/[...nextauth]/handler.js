// import { authOptions } from './route'
// import { getServerSession } from "next-auth/next"

// export default async function handler(req, res) {
//   const session = await getServerSession(req, res, authOptions)

//   if (!session) {
//     res.status(401).json({ message: "You must be logged in." });
//     return;
//   }

//   return res.json({
//     message: 'Success',
//   })
// }






// import { useSession } from "next-auth/react";
// import Router from "next/router";
// import { useEffect } from "react";

// const Protected = ()=> {
//   const { status, data } = useSession();

//   useEffect(() => {
//     if (status === "unauthenticated") Router.replace("/auth/signin");
//   }, [status]);

//   if (status === "authenticated")
//     return (
//       <div>
//         This page is Protected for special people. like{"\n"}
//         {JSON.stringify(data.user, null, 2)}
//       </div>
//     );

//   return <div>loading</div>;
// };

// export default Protected;