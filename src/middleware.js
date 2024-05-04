import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function extractPermissions(menuItems) {
  const permissions = {};

  function processMenuItems(items, parentSlug = "") {
    items.forEach((menu) => {
      const slug = parentSlug ? `${parentSlug}/${menu.slug}` : menu.slug;

      if (menu.permission || menu.sub_menu) {
        permissions[slug] = true;
      }

      if (menu.permission) {
        menu.permission.forEach((permission) => {
          permissions[`${slug}/${permission}`] = true;
        });
      }

      if (menu.sub_menu) {
        processMenuItems(menu.sub_menu, slug);
      }
    });
  }

  processMenuItems(menuItems);
  return Object.keys(permissions);
}

export default withAuth(
  function middleware(req) {
    const menuWithPermissions = extractPermissions(
      req.nextauth.token?.data?.menus
    );
    const login = req.nextUrl.pathname.startsWith("/login");
    const requestedPath = req.nextUrl.pathname;

    // if (login && validToken) {
    //   return NextResponse.rewrite(new URL("/dashboard", req.url));
    // }

    const verifiedPath = menuWithPermissions.includes(requestedPath)
      ? requestedPath
      : false;

    // console.log("menuWithPermissions", menuWithPermissions);
    // console.log("requestedPath", requestedPath);
    // console.log("verifiedPath", verifiedPath);

    if (
      verifiedPath ||
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/academic/class-routinev2")
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.rewrite(new URL("/403", req.url));
    }

    // switch (userType) {
    //   case "ADMIN":
    //     if (
    //       userMenus.includes(requestedPath) ||
    //       req.nextUrl.pathname.startsWith("/dashboard")
    //     ) {
    //       return NextResponse.next();
    //     } else {
    //       return NextResponse.rewrite(new URL("/403", req.url));
    //     }
    //   case "STUDENT":
    //     if (
    //       userMenus.includes(requestedPath) ||
    //       req.nextUrl.pathname.startsWith("/dashboard")
    //     ) {
    //       return NextResponse.next();
    //     } else {
    //       return NextResponse.rewrite(new URL("/403", req.url));
    //     }
    //   case "ACCOUNTING":
    //     if (requiresAuthAccounting) {
    //       return NextResponse.next();
    //     } else {
    //       return NextResponse.rewrite(new URL("/403", req.url));
    //     }
    //   default:
    //     return NextResponse.rewrite(new URL("/403", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // "/login",
    "/dashboard",
    "/class-timetable",
    "/academic/:path*",
    "/student-info/:path*",
    "/human-resource/:path*",
    "/exam/:path*",
    "/fees-collection/:path*",
  ],
};
