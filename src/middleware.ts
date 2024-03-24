import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ep_auth } from "./config/api_endpoint";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");
    const res = await fetch(ep_auth, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token?.value}`,
        nextpath: `${request.nextUrl.pathname}`,
      },
    }).then((res) => res.json());
    if (!res.process) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/lobby/:path*"],
};
