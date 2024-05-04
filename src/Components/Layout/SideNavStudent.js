"use client";
import { Box, Button, Typography, Drawer, List } from "@mui/material";
import NextImage from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./SideNav.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useOnlyIcon } from "../../Components/Layout/NavContext";
import { Icon } from "@iconify/react";

const SideNav = ({ session }) => {
  const pathname = usePathname();
  const {
    onlyIcon,
    setOnlyIcon,
    toggleOnlyIcon,
    hovering,
    color,
    colorX,
    palette,
  } = useOnlyIcon();
  const menuData = session?.user?.data?.menus;
  const Institution = session?.user?.data?.institution;

  const [selected, setSelected] = useState();
  const [isBlinking, setIsBlinking] = useState(true);
  const [selectedSubItems, setSelectedSubItems] = useState([]);

  const handleSubItemClick = (i, subindex, name) => {
    // console.log("subname", name);
    setSelectedSubItems((prevSelectedSubItems) => {
      const newSelectedSubItems = [...prevSelectedSubItems];
      newSelectedSubItems[i] = subindex;
      return newSelectedSubItems;
    });
  };

  function getOrderNumber(menuName) {
    const menuItem =
      menuData && menuData.find((item) => item.name === menuName);
    return menuItem ? menuItem.order : null;
  }
  const pathnames = pathname.split("/")[1];
  function convertToTitleCase(inputString) {
    if (inputString == "Hrms") {
      return inputString.toUpperCase();
    } else {
      return inputString
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
    }
  }

  const ModifiedPathName = convertToTitleCase(
    pathnames.charAt(0).toUpperCase() + pathnames.slice(1).replace(/-/g, " ")
  );

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderNumber = async () => {
      try {
        const orderNumber = getOrderNumber(ModifiedPathName);
        setOrder(orderNumber);
      } catch (error) {
        console.error("Error fetching order number:", error);
      }
    };

    fetchOrderNumber();
  }, [menuData]);

  useEffect(() => {
    if (order !== null) {
      setSelected(order - 1);
    }
  }, [order]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggle = (i) => {
    if (selected === i) {
      setSelected(null);
      setSelectedSubItems([]);
    } else {
      setSelected(i);
      setSelectedSubItems([]);
    }
  };

  const buttonStyles = {
    textTransform: "none",
  };

  const listItemStyle = {
    listStyleType: "none",
  };

  return (
    <Box
      sx={{
        width: onlyIcon ? "100px" : "250px",
        position: "sticky",
        top: 0,
        height: "100vh",
        backgroundColor: palette.customColors.sideboxBg,
        boxShadow: "1px 0px 5px rgba(0, 0, 0, 0.1)",
        transition: "width 0.3s",
      }}
      onMouseEnter={hovering ? toggleOnlyIcon : () => {}}
      onMouseLeave={hovering ? toggleOnlyIcon : () => {}}
    >
      <Box
        sx={{
          padding: "30px 22px 30px 15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Link href="/dashboard">
            {onlyIcon ? (
              <NextImage
                src="/images/sidenav/logo1-2.png"
                alt="Cined Logo"
                height="50"
                width="34"
                style={{ filter: palette.logo.primary }}
              />
            ) : (
              <NextImage
                src={`${process.env.NEXT_PUBLIC_HOST}/${Institution?.logo}`}
                alt="Cined Logo"
                height="66"
                width="133"
                style={{ filter: palette.logo.primary }}
              />
            )}
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "85vh",
            width: "215px",
          }}
        >
          <Scrollbars
              style={{ width: 220, height: 920 }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
          <Box sx={{ mt: "20px" }}>
            {menuData &&
              menuData.map((item, i) => (
                <>
                  <Button
                    style={buttonStyles}
                    fullWidth={!onlyIcon}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: onlyIcon ? "center" : "space-between",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "5px",
                      background: `${
                        selected === i
                          ? `linear-gradient(45deg, ${color} 30%, ${colorX} 90%)`
                          : ""
                      }`,
                      mb: "10px",
                      ":hover": {
                        backgroundColor: palette.menuButton.hover,
                      },
                    }}
                    onClick={() => toggle(i)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {/* <NextImage
                              src={item.icon}
                              alt="Cined Logo"
                              height="26"
                              width="26"
                              style={{
                                filter:
                                  selected === i
                                    ? "brightness(0) invert(1)"
                                    : "",
                              }}
                            /> */}

                        <Icon
                          style={{
                            fontSize: "28px",
                            color:
                              selected === i
                                ? "white"
                                : palette.menuButton.icon,
                          }}
                          icon={item.icon_text}
                        />
                        {/* 
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path fill="" d={item.icon_text} />
                            </svg> */}
                      </Box>
                      {onlyIcon ? (
                        ""
                      ) : (
                        <Box>
                          {item && (
                            <Typography
                              sx={{
                                color:
                                  selected === i
                                    ? "white"
                                    : palette.menuButton.text,
                              }}
                            >
                              {item.name}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>
                    {onlyIcon ? (
                      ""
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {selected == i ? (
                          <KeyboardArrowDownIcon
                            sx={{
                              color:
                                selected === i
                                  ? "white"
                                  : palette.menuButton.text,
                            }}
                          />
                        ) : (
                          <ChevronRightIcon
                            sx={{
                              color:
                                selected === i
                                  ? "white"
                                  : palette.menuButton.text,
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </Button>

                  {selected == i && !onlyIcon ? (
                    <Box
                      className={selected == i && "text"}
                      sx={{ color: "gray", ml: "28px" }}
                    >
                      {item.sub_menu
                        .filter((submenuItem) =>
                          submenuItem.permission.includes("view")
                        )
                        .map((lists, subindex) => (
                          <List
                            sx={{
                              listStyleType: "none",
                              fontSize: "16px",
                              p: "3px",
                              "& :hover": {
                                color: palette.menuButton.listhover,
                                fontWeight: 600,
                              },
                            }}
                            key={subindex}
                          >
                            <Link
                              href={lists.slug}
                              style={{
                                color:
                                  subindex == selectedSubItems[i]
                                    ? palette.menuButton.selectedlist
                                    : palette.menuButton.nonselectedlist,
                                fontWeight:
                                  subindex == selectedSubItems[i] ? "650" : "",
                                transition:
                                  subindex == selectedSubItems[i]
                                    ? "all 0.3s ease"
                                    : "",
                                textDecoration: "none",

                                ...(lists.slug === pathname && {
                                  color: palette.menuButton.selectedlist,
                                  fontWeight: 600,
                                }),
                              }}
                              onClick={() =>
                                handleSubItemClick(i, subindex, lists.name)
                              }
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  // gap: "3px",
                                  alignItems: "center",
                                }}
                              >
                                <Icon icon="ep:d-arrow-right" />
                                {lists.name}
                              </Box>
                            </Link>
                          </List>
                        ))}
                    </Box>
                  ) : (
                    ""
                  )}
                </>
              ))}
          </Box>
          </Scrollbars>
          {!onlyIcon ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "50px",
              }}
            >
              <Link
                href="https://meet.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  type="submit"
                  className="mt-4"
                  sx={{
                    backgroundColor: "#F3F3F4",
                    ":hover": {
                      background:
                        "linear-gradient(45deg, #786CF1 30%, #978DF3 90%)",
                    },
                    fontWeight: "700",
                    color: "black",
                  }}
                >
                  <Box
                    className={`red-light ${isBlinking ? "blink" : ""}`}
                  ></Box>
                  Go Live
                </Button>
              </Link>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <NextImage
                  src="/images/sidenav/nav-footer.png"
                  alt="Cined Logo"
                  height="26"
                  width="170"
                />
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default SideNav;

// import { Box, Button, Typography } from "@mui/material";
// import NextImage from "next/image";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import styles from "./SideNav.css";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import Cookies from "js-cookie";

// const data = [
//   {
//     nav: "Dashboard",
//     link: "/dashboard",
//     unlink: true,
//   },
//   {
//     nav: "Student Info",
//     link: "/student-info/student-details",
//   },
//   {
//     nav: "Accademic",
//     link: "academic/session",
//   },
//   {
//     nav: "Exam",
//     link: "/exam/exam-routine",
//   },
//   {
//     nav: "Online Exam",
//     link: "/exam/exam-routine",
//   },
//   {
//     nav: "Account",
//     link: "/exam/exam-routine",
//   },
//   {
//     nav: "Expense",
//     link: "/exam/exam-routine",
//   },
//   {
//     nav: "Income",
//     link: "/exam/exam-routine",
//   },
//   {
//     nav: "HRMS",
//     link: "/exam/exam-routine",
//   },
// ];

// const mylist = [
//   [],
//   [
//     { list: "Student Details", link: "/student-info/student-details" },
//     { list: "Student Admission", link: "/student-info/student-admission" },
//     {
//       list: "Online Admission Report",
//       link: "/student-info/online-admission-report",
//     },
//     { list: "Student Attendance", link: "/student-info/student-attendance" },
//     { list: "Attendance Report", link: "/student-info/attendance-report" },
//     {
//       list: "Student late Attendance",
//       link: "/student-info/student-late-attendance",
//     },
//     { list: "Approve Leave", link: "/student-info/approve-leave" },
//     { list: "Promote Students", link: "/student-info/promote-students" },
//     {
//       list: "Fourth Subject Assign",
//       link: "/student-info/fourth-subject-assign",
//     },
//   ],
//   [
//     { list: "Session", link: "/academic/session" },
//     { list: "Section", link: "/academic/section" },
//     { list: "Class", link: "/academic/create-class" },
//     { list: "Subjects", link: "/academic/create-subject" },
//     { list: "Ebook Upload", link: "/academic/upload-ebook" },
//     { list: "Lecture Video Upload", link: "/academic/upload-lecture-video" },
//     { list: "Lecture Pdf Upload", link: "/academic/upload-lecture-pdf" },
//     { list: "Lecture PPT Upload", link: "/academic/upload-lecture-ppt" },
//     { list: "Assign Teacher Shift", link: "/academic/assign-shift" },
//     { list: "Assign Student Shift", link: "/academic/assign-shift-student" },
//     { list: "Assign Class Teacher", link: "/academic/assign-shift-student" },
//     { list: "Assign Class Period", link: "/academic/assign-shift-student" },
//     { list: "Make Class Timetable", link: "/academic/assign-shift-student" },
//   ],
//   [
//     { list: "Exam Routine", link: "/exam/exam-routine" },
//     { list: "Marks Grade", link: "/exam/exam-routine" },
//     { list: "Create Exam", link: "/exam/exam-routine" },
//   ],
//   [
//     { list: "Exam Routine", link: "/exam/exam-routine" },
//     { list: "Marks Grade", link: "/exam/exam-routine" },
//     { list: "Create Exam", link: "/exam/exam-routine" },
//   ],
//   [
//     { list: "Exam Routine", link: "/exam/exam-routine" },
//     { list: "Marks Grade", link: "/exam/exam-routine" },
//     { list: "Create Exam", link: "/exam/exam-routine" },
//   ],
//   [
//     { list: "Exam Routine", link: "/exam/exam-routine" },
//     { list: "Marks Grade", link: "/exam/exam-routine" },
//     { list: "Create Exam", link: "/exam/exam-routine" },
//   ],
//   [
//     { list: "Exam Routine", link: "/exam/exam-routine" },
//     { list: "Marks Grade", link: "/exam/exam-routine" },
//     { list: "Create Exam", link: "/exam/exam-routine" },
//   ],
//   [
//     { list: "Exam Routine", link: "/exam/exam-routine" },
//     { list: "Marks Grade", link: "/exam/exam-routine" },
//     { list: "Create Exam", link: "/exam/exam-routine" },
//   ],
// ];

// const SideNav = () => {
//   const pathname = usePathname();
//   const pats = "/" + pathname.split("/")[1];

//   const initialState = () => {
//     if (pats === "/dashboard") {
//       return 0;
//     } else if (pats === "/student-info") {
//       return 1;
//     } else if (pats === "/academic") {
//       return 2;
//     } else if (pats === "/exam") {
//       return 3;
//     } else if (pats === "/online-exam") {
//       return 4;
//     } else if (pats === "/account") {
//       return 5;
//     } else if (pats === "/expense") {
//       return 6;
//     } else if (pats === "/income") {
//       return 7;
//     } else if (pats === "/hrms") {
//       return 8;
//     }
//     return 0;
//   };

//   const [selected, setSelected] = useState(initialState);
//   const [isBlinking, setIsBlinking] = useState(true);
//   const [selectedSubItems, setSelectedSubItems] = useState(
//     Array(mylist.length)
//   );

//   const handleSubItemClick = (i, subindex) => {
//     setSelectedSubItems((prevSelectedSubItems) => {
//       const newSelectedSubItems = [...prevSelectedSubItems];
//       newSelectedSubItems[i] = subindex;
//       return newSelectedSubItems;
//     });
//   };

//   useEffect(() => {
//     if (pathname.startsWith("/dashboard")) {
//       setSelected(0);
//     } else if (pathname.startsWith("/student-info")) {
//       setSelected(1);
//     } else if (pathname.startsWith("/academic")) {
//       setSelected(2);
//     } else if (pathname.startsWith("/exam")) {
//       setSelected(3);
//     } else if (pathname.startsWith("/online-exam")) {
//       setSelected(4);
//     } else if (pathname.startsWith("/account")) {
//       setSelected(5);
//     } else if (pathname.startsWith("/expense")) {
//       setSelected(6);
//     } else if (pathname.startsWith("/income")) {
//       setSelected(7);
//     } else if (pathname.startsWith("/hrms")) {
//       setSelected(8);
//     } else {
//       setSelected(0);
//     }
//   }, [pathname]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setIsBlinking((prevIsBlinking) => !prevIsBlinking);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const toggle = (i) => {
//     if (selected == i) {
//       return setSelected(null);
//     }
//     setSelected(i);
//   };

//   const buttonStyles = {
//     textTransform: "none",
//   };
//   const listItemStyle = {
//     marginBottom: "3px",
//   };

//   return (
//     <Box
//       sx={{
//         width: "240px",
//         height: "100%",
//         backgroundColor: "white",
//         boxShadow: "1px 0px 5px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Scrollbars
//         style={{ width: 240, height: 920 }}
//         autoHide
//         autoHideTimeout={1000}
//         autoHideDuration={200}
//       >
//         <Box
//           sx={{
//             backgroundColor: "white",
//             padding: "30px 22px 30px 15px",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//             }}
//           >
//             <Link href="/dashboard">
//               <NextImage
//                 src="/images/sidenav/logo1.png"
//                 alt="Cined Logo"
//                 height="66"
//                 width="133"
//               />
//             </Link>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               height: "85vh",
//             }}
//           >
//             <Box sx={{ mt: "20px" }}>
//               {data.map((item, i) => (
//                 <>
//                   <Button
//                     style={buttonStyles}
//                     fullWidth
//                     sx={{
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       gap: "10px",
//                       borderRadius: "5px",
//                       mb: "10px",
//                       ":hover": {
//                         bgcolor: "#E5E5E5",
//                       },
//                     }}
//                     className={selected == i ? "hi" : ""}
//                     onClick={() => toggle(i)}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "row",
//                         gap: "10px",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box>
//                         {selected === i ? (
//                           <NextImage
//                             src="/images/sidenav/student-icon-white.png"
//                             alt="Cined Logo"
//                             height="26"
//                             width="26"
//                           />
//                         ) : (
//                           <NextImage
//                             src="/images/sidenav/student-icon-black.png"
//                             alt="Cined Logo"
//                             height="26"
//                             width="26"
//                           />
//                         )}
//                       </Box>

//                       <Box>
//                         {item.unlink ? (
//                           <Link
//                             href={item.link}
//                             style={{ textDecoration: "none" }}
//                           >
//                             <Typography
//                               sx={{ color: selected === i ? "white" : "black" }}
//                             >
//                               {item.nav}
//                             </Typography>
//                           </Link>
//                         ) : (
//                           <Typography
//                             sx={{ color: selected === i ? "white" : "black" }}
//                           >
//                             {item.nav}
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>

//                     <Box sx={{ alignItems: "center" }}>
//                       {selected == i ? (
//                         <KeyboardArrowDownIcon
//                           sx={{ color: selected === i ? "white" : "black" }}
//                         />
//                       ) : (
//                         <ChevronRightIcon
//                           sx={{ color: selected === i ? "white" : "black" }}
//                         />
//                       )}
//                     </Box>
//                   </Button>

//                   {selected == i ? (
//                     <Box
//                       className={selected == i && "text"}
//                       sx={{ color: "gray", ml: "13px" }}
//                     >
//                       {mylist[i].map((lists, subindex) => (
//                         <li style={listItemStyle} key={subindex}>
//                           <Link
//                             href={lists.link}
//                             style={{
//                               color:
//                                 subindex == selectedSubItems[i]
//                                   ? "black"
//                                   : "gray",
//                               fontWeight:
//                                 subindex == selectedSubItems[i] ? "600" : "",

//                               transition:
//                                 subindex == selectedSubItems[i]
//                                   ? "all 0.3s ease"
//                                   : "",
//                               textDecoration: "none",
//                               fontSize: "13px",
//                             }}
//                             onClick={() => handleSubItemClick(i, subindex)}
//                           >
//                             {lists.list}
//                           </Link>
//                         </li>
//                       ))}
//                     </Box>
//                   ) : (
//                     ""
//                   )}
//                 </>
//               ))}
//             </Box>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
//               <Link href="https://meet.google.com/">
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   size="small"
//                   type="submit"
//                   className="mt-4"
//                   sx={{
//                     backgroundColor: "#F3F3F4",
//                     ":hover": {
//                       background:
//                         "linear-gradient(45deg, #786CF1 30%, #978DF3 90%)",
//                     },
//                     fontWeight: "700",
//                     color: "black",
//                   }}
//                 >
//                   <Box
//                     className={`red-light ${isBlinking ? "blink" : ""}`}
//                   ></Box>
//                   Go Live
//                 </Button>
//               </Link>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "center",
//                 }}
//               >
//                 <NextImage
//                   src="/images/sidenav/nav-footer.png"
//                   alt="Cined Logo"
//                   height="26"
//                   width="170"
//                 />
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Scrollbars>
//     </Box>
//   );
// };
// export default SideNav;
